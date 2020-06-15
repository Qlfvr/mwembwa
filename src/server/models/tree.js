const mongoose = require("mongoose");

const treeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    geoloc: {
        type: Object,
        required: true,
    },
    diameter: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    color: {type: String},
    isLocked: {type: Boolean},
    user: {type: Object},
});

module.exports = mongoose.model("Tree", treeSchema);
