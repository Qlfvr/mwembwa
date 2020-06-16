const mongoose = require("mongoose");

const treeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    location: {
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
    color: {
        type: String,
    },
});

module.exports = mongoose.model("Tree", treeSchema);
