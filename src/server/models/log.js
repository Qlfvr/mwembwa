const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
    action: {
        type: String,
    },
    createdBy: {
        type: "ObjectId",
        ref: "User",
    },
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Log", logSchema);
