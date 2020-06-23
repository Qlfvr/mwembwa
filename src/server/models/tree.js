const mongoose = require("mongoose");

const treeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    location: {
        type: {type: String},
        coordinates: [],
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
    isLocked: {
        type: Boolean,
    },
    comments: [
        {
            content: {type: String},
            owner: {
                type: "ObjectId",
                ref: "User",
            },
            createdAt: {type: Date, default: Date.now},
        },
    ],
});

treeSchema.index({location: "2dsphere"});

module.exports = mongoose.model("Tree", treeSchema);
