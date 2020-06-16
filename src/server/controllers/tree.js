const Tree = require("../models/tree");
const User = require("../models/user");

exports.getAllTrees = (req, res) => {
    Tree.find()
        .then(tree => res.status(200).json(tree))
        .catch(error => res.status(404).json({error}));
};

exports.setRandomTrees = (req, res) => {
    // eslint-disable-next-line consistent-return
    User.findOne({email: "aaa@hotmail.com"}, (err, user) => {
        if (!user) {
            return res.status(401).json({error: "User not found"});
        }

        Tree.aggregate(
            [{$match: {owner: null}}, {$sample: {size: 3}}],
            // eslint-disable-next-line no-shadow
            (err, trees) => {
                for (const tree of trees) {
                    Tree.updateOne({_id: tree._id}, {owner: user._id})
                        .then(() =>
                            res
                                .status(200)
                                .json({message: "Random trees generated"}),
                        )
                        .catch(error => res.status(404).json({error}));
                }
            },
        );
    });
};
