const Log = require("../models/log");

exports.add = ({action, createdBy}) => {
    console.log("addLog");

    const log = new Log({
        action,
        createdBy,
    });
    log.save();
};
