const Tree = require("../models/tree");
const User = require("../models/user");
const helpers = require("../helpers/index");
const mongoose = require("mongoose");

import {getTreeValue} from "../helpers/index";

exports.getAllTrees = (req, res) => {
    Tree.find()
        .then((tree) => res.status(200).json(tree))
        .catch((error) => res.status(404).json({error}));
};

exports.setRandomTrees = (req, res) => {
    User.findOne({_id: req.userId})
        .then((user) => {
            if (!user) {
                return res.status(401).json({error: "User not found"});
            }

            Tree.aggregate([{$match: {owner: null}}, {$sample: {size: 3}}])
                .then((trees) => {
                    for (const tree of trees) {
                        Tree.updateOne(
                            {_id: tree._id},
                            {owner: user._id, color: user.color},
                        )
                            .then(() => res.status(201).end())
                            .catch((error) => res.status(404).json({error}));
                    }
                    return true;
                })
                .catch((error) => res.status(404).json({error}));
            return true;
        })
        .catch((error) => res.status(404).json({error}));
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

        const treeValue = helpers.getTreeValue(tree);

        const queryGeolocTrees100MeterRadius = () => ({
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: tree.location.coordinates,
                },
                distanceField: "distance.calculated",
                maxDistance: 100,
            },
        });

        const queryValueTrees100MeterRadius = await Tree.aggregate([
            queryGeolocTrees100MeterRadius(),
            {
                $group: {
                    _id: null,
                    treeValue: {
                        $sum: {$ceil: {$multiply: ["$diameter", "$height"]}},
                    },
                },
            },
        ]);
        const valueTrees100MeterRadius =
            queryValueTrees100MeterRadius[0].treeValue;

        const queryAmountPlayersAndValuePlayersTrees100MeterRadius = await Tree.aggregate(
            [
                queryGeolocTrees100MeterRadius(),
                {
                    $match: {owner: {$ne: null}},
                },
                {
                    $group: {
                        _id: null,
                        amountPlayers: {$sum: 1},
                        treeValue: {
                            $sum: {
                                $ceil: {$multiply: ["$diameter", "$height"]},
                            },
                        },
                    },
                },
            ],
        );
        const amountPlayers100MeterRadius =
            queryAmountPlayersAndValuePlayersTrees100MeterRadius[0]
                .amountPlayers;
        const valuePlayersTrees100MeterRadius =
            queryAmountPlayersAndValuePlayersTrees100MeterRadius[0].treeValue;

        const leavesToPay =
            treeValue * 10 +
            valueTrees100MeterRadius * amountPlayers100MeterRadius -
            valuePlayersTrees100MeterRadius / amountPlayers100MeterRadius;

        const isPlayerHaveEnoughLeavesToLock =
            user.leaves >= leavesToPay ? true : false;
        if (!isPlayerHaveEnoughLeavesToLock) {
            return res.status(401).json({
                error: "The user doesn't have enough leaves to lock this tree",
            });
        }

        await Tree.updateOne({_id: tree._id}, {isLocked: true});

        await User.updateOne(
            {_id: user._id},
            {leaves: user.leaves - leavesToPay},
        );
    } catch (error) {
        res.status(500).json({error});
    }

    return true;
};

exports.buyOne = (req, res) => {
    const treeId = req.params.id;
    const userId = req.userId;
    // get user data

    User.findById(userId)
        .then((user) => {
            Tree.findById(treeId)
                .then((tree) => {
                    const treeValue = getTreeValue(tree);

                    if (
                        user.leaves > treeValue &&
                        tree.owner !== user._id /*&& tree.isLocked == false*/
                    ) {
                        Tree.updateOne(
                            {_id: treeId},
                            {
                                color: user.color,
                                owner: user._id,
                            },
                        )
                            .then(() => res.status(201).json())
                            .catch((error) => res.status(404).json(error));

                        User.updateOne(
                            {_id: userId},
                            {
                                leaves: Math.ceil(user.leaves - treeValue),
                            },
                        )
                            .then(() => res.status(201).json())
                            .catch((error) => res.status(404).json(error));
                    } else {
                        res.send(
                            "Can't buy this tree : not enough leaves or is lock or you already own it",
                        );
                    }
                })
                .catch((error) => res.status(404).json(error));
        })
        .catch((error) => res.status(404).json({error}));
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

        res.status(201).send("Comment added");
    } catch (error) {
        console.log(error);
    }
};
