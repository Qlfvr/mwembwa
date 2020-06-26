const Log = require("../models/log");

exports.add = ({action, createdBy}) => {
    const log = new Log({
        action,
        createdBy,
    });
    log.save();
};
