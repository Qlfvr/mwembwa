const Tree = require("../models/tree");
const User = require("../models/user");

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

// exports.buyTree = (req, res) => {
//     Tree.updateOne({_id: req.params.id}, {color: "test"})

//         .then((res) =>
//             res.status(201).json({message: "Random trees generated"}),
//         )
//         .catch((error) => res.status(400).json({error: "a"}));
// };

exports.buyTree = (req, res) => {
    Tree.updateOne({_id: req.params.id}, {color: "kikoulol"})

        .then(() => res.status(201).json())
        .catch((error) => res.status(404).json({error}));
};
