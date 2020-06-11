const Tree = require("../models/tree");

exports.getAllTrees = (req, res) => {
    Tree.find()
        .then(tree => res.status(200).json(tree))
        .catch(error => res.status(404).json({error}));
};

exports.getOneTree = (req, res) => {
    Tree.findOne({_id: req.params.id})
        .then(tree => res.status(200).json(tree))
        .catch(error => res.status(404).json({error}));
};

// exports.createTree = (req, res, next) => {
//     const tree = new Tree({
//         name: req.body.name,
//         geoloc: req.body.geoloc,
//         diameter: req.body.diameter,
//         circumference: req.body.circumference,
//         height: req.body.height,
//     });
//     tree.save()
//         .then(() => res.status(201).json({message: "Tree created"}))
//         .catch((error) => res.status(400).json({error}));
// };
