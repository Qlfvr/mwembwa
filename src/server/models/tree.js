const mongoose = require("mongoose");

const treeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    geoloc: {
        type: Object,
    },
    diameter: {
        type: Number,
    },
    circumference: {
        type: Number,
    },
    height: {
        type: Number,
    },
    owner: {
        type: "ObjectId",
        ref: "User",
    },
});

module.exports = mongoose.model("Tree", treeSchema);
