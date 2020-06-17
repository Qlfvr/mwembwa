const Tree = require("../models/tree");
const User = require("../models/user");
const helpers = require("../helpers/index");

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
                        Tree.updateOne({_id: tree._id}, {owner: user._id})
                            .then(() =>
                                res.json({message: "Random trees generated"}),
                            )
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
        const tree = await Tree.findOne({_id: req.params.treeId});
        const treeValue = helpers.getTreeValue(tree);

        // const treesRadius = await Tree.find({
        //     location: {
        //         $near: {
        //             $geometry: {
        //                 type: "Point",
        //                 coordinates: tree.location.coordinates,
        //             },
        //             $maxDistance: 100,
        //         },
        //     },
        // });

        const treesRadius = await Tree.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: tree.location.coordinates,
                    },
                    distanceField: "distance.calculated",
                    maxDistance: 100,
                },
            },
        ]);

        console.log(treesRadius);

        const leavesToPay = treeValue * 10;
    } catch (error) {
        res.status(500).json({error});
    }

    return true;
};
