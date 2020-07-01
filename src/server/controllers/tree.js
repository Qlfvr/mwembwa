const Tree = require("../models/tree");
const User = require("../models/user");
const calculatePrice = require("../helpers/index").calculatePrice;
const calculateLockPrice = require("../helpers/index").calculateLockPrice;
const mongoose = require("mongoose");
const log = require("./log");

const queryPopulateUser = () => ({
    $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerTree",
    },
});

const queryPopulateComment = () => ({
    $lookup: {
        from: "users",
        localField: "comments.owner",
        foreignField: "_id",
        as: "ownerComment",
    },
});

const queryGetAllTrees = () => ({
    $project: {
        _id: 1,
        name: 1,
        location: 1,
        diameter: 1,
        height: 1,
        owner: "$ownerTree",
        isLocked: 1,
        comments: {
            _id: 1,
            content: 1,
            ownerComment: "$ownerComment",
            createdAt: 1,
        },
    },
});

exports.getAllTrees = async (req, res) => {
    const coordinateCenterMap = JSON.parse(req.query.coordinateCenterMap);

    try {
        const responseGetAllTrees = await Tree.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [
                            coordinateCenterMap.lat,
                            coordinateCenterMap.lng,
                        ],
                    },
                    distanceField: "distance.calculated",
                    maxDistance: 300,
                },
            },
            queryPopulateUser(),
            queryPopulateComment(),
            queryGetAllTrees(),
        ]).exec();

        const allTrees = responseGetAllTrees;

        return res.status(200).json(allTrees);
    } catch (error) {
        return res.status(500).json({error});
    }
};

exports.getOneTree = async (req, res) => {
    try {
        const responseGetOneTree = await Tree.aggregate([
            {$match: {_id: mongoose.Types.ObjectId(req.params.treeId)}},
            queryPopulateUser(),
            queryPopulateComment(),
            queryGetAllTrees(),
        ]).exec();

        const tree = responseGetOneTree[0];

        tree.price = await calculatePrice(tree, req.userId);

        return res.status(200).json(tree);
    } catch (error) {
        return res.status(500).json({error});
    }
};

exports.setRandomTrees = (req, res) => {
    User.findOne({_id: req.userId})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: "User not found"});
            }

            Tree.aggregate([{$match: {owner: null}}, {$sample: {size: 3}}])
                .then(trees => {
                    for (const tree of trees) {
                        Tree.updateOne(
                            {_id: tree._id},
                            {owner: user._id, color: user.color},
                        )
                            .then(() => res.status(201).end())
                            .catch(error => res.status(404).json({error}));
                    }
                    return true;
                })
                .catch(error => res.status(404).json({error}));
            return true;
        })
        .catch(error => res.status(404).json({error}));
    return true;
};

exports.lockTree = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.userId});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        const tree = await Tree.findOne({_id: req.params.treeId});
        if (!tree) {
            return res.status(404).json({error: "Tree not found"});
        }

        const isTreeBelongToUser =
            user._id.toString() === tree.owner.toString() ? true : false;
        if (!isTreeBelongToUser) {
            return res.status(403).json({
                error: "The tree does not belong to this user",
            });
        }

        if (tree.isLocked) {
            return res.status(403).json({
                error: "The tree is already locked",
            });
        }

        const lockPrice = await calculateLockPrice(tree);

        const isPlayerHaveEnoughLeavesToLock =
            user.leaves >= lockPrice ? true : false;
        if (!isPlayerHaveEnoughLeavesToLock) {
            return res.status(401).json({
                error: "The user doesn't have enough leaves to lock this tree",
            });
        }

        await Tree.updateOne({_id: tree._id}, {isLocked: true});

        await User.updateOne(
            {_id: user._id},
            {leaves: user.leaves - lockPrice},
        );
        log.add({action: "Tree locked", createdBy: req.userId});

        return res.status(201).json("Tree successfully locked");
    } catch (error) {
        res.status(500).json({error});
    }

    return true;
};

exports.buyOne = async (req, res) => {
    const treeId = req.params.treeId;
    const userId = req.userId;
    // get user data

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        const tree = await Tree.findById(treeId);
        if (!tree) {
            return res.status(404).json({error: "tree not found"});
        }

        if (tree.owner === null || tree.owner.toString() !== userId) {
            if (tree.isLocked !== true) {
                const treePrice = await calculatePrice(tree, userId);

                if (user.leaves > treePrice) {
                    Tree.updateOne(
                        {_id: treeId},
                        {
                            color: user.color,
                            owner: userId,
                        },
                    )
                        .then(() => res.status(201).json())
                        .catch(error => res.status(404).json(error));

                    User.updateOne(
                        {_id: userId},
                        {
                            leaves: Math.ceil(user.leaves - treePrice),
                        },
                    )
                        .then(() => res.status(201).json())
                        .catch(error => res.status(404).json(error));
                } else {
                    return res
                        .status(403)
                        .json({message: "you don't have enough leaves"});
                }
            } else {
                return res.status(403).json({message: "this tree is locked"});
            }
        } else {
            return res.status(403).json({message: "you already own this tree"});
        }
    } catch (error) {
        res.status(500).json({error});
    }
    log.add({action: "Tree purchased", createdBy: userId});

    return res.status(201).json({message: "Successfull transaction"});
};
exports.addComment = async (req, res) => {
    try {
        const tree = await Tree.findOne({_id: req.params.treeId});
        if (!tree) {
            return res.status(404).json({error: "Tree not found"});
        }

        await Tree.updateOne(
            {_id: tree._id},
            {
                $push: {
                    comments: {
                        content: req.body.content,
                        owner: mongoose.Types.ObjectId(req.userId),
                    },
                },
            },
        );

        log.add({action: "Add comment", createdBy: req.userId});

        res.status(201).send("Comment added");

        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        // console.log(error);
    }
    return true;
};
