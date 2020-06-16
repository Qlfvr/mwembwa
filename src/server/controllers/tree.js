const Tree = require("../models/tree");
const User = require("../models/user");

exports.getAllTrees = (req, res) => {
    Tree.find()
        .then((tree) => res.status(200).json(tree))
        .catch((error) => res.status(404).json({error}));
};

exports.setRandomTrees = (req, res) => {
    User.findOne({email: "aaa@hotmail.com"})
        .then((user) => {
            if (!user) {
                return res.status(401).json({error: "User not found"});
            }

            Tree.aggregate(
                [{$match: {user: null}}, {$sample: {size: 3}}],
                function (err, trees) {
                    for (const tree of trees) {
                        Tree.update(
                            {_id: tree._id},
                            {$set: {owner: user._id}},
                            function (err) {
                                return res
                                    .status(201)
                                    .json({message: "Random trees generated"});

                                // .then((res) =>
                                //     res
                                //         .status(201)
                                //         .json({message: "Random trees generated"}),
                                // )
                                // .catch((error) =>
                                //     res.status(400).json({error: "a"}),
                                // );
                            },
                        );
                    }
                },
            );
        })
        .catch((error) => res.status(500).json({error: "b"}));
};

// exports.buyTree = (req, res) => {
//     Tree.updateOne({_id: req.params.id}, {color: "test"})

//         .then((res) =>
//             res.status(201).json({message: "Random trees generated"}),
//         )
//         .catch((error) => res.status(400).json({error: "a"}));
// };

exports.buyTree = (req, res) => {
    Tree.update({_id: req.params.id}, {color : "red"})

    .then((tree) => res.status(201).json(tree))
    .catch((error) => res.status(404).json({error}));
};