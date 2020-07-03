const Log = require("../models/log");

exports.add = ({action, createdBy}) => {
    const log = new Log({
        action,
        createdBy,
    });
    log.save();
};

exports.getAllLogs = async (req, res) => {
    try {
        const responseGetAllLogs = await Log.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy",
                },
            },
            {$unwind: "$createdBy"},
            {$sort: {createdAt: -1}},
            {
                $project: {
                    _id: 1,
                    action: 1,
                    createdAt: 1,
                    createdBy: "$createdBy",
                },
            },
        ]).exec();

        const logsActionsTranslated = responseGetAllLogs.map(log => {
            let actionTranslated = null;

            switch (log.action) {
                case "Add comment":
                    actionTranslated = "Commentaire ajouté";
                    break;
                case "Tree locked":
                    actionTranslated = "Arbre bloqué";
                    break;
                case "Tree purchased":
                    actionTranslated = "Arbre acheté";
                    break;
                default:
                    actionTranslated = "Arbre acheté";
                    break;
            }

            return {...log, action: actionTranslated};
        });

        return res.status(200).json(logsActionsTranslated);
    } catch (error) {
        return res.status(500).json({error});
    }
};
