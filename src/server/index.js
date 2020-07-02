import express from "express";
import path from "path";
const mongoose = require("mongoose");
const treeRoutes = require("./routes/tree");
const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");
const Tree = require("./models/tree");
const User = require("./models/user");

mongoose
    .connect("mongodb://dev:dev@mongo:27017/", {
        dbName: "mwenbwa",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connection to MongoDB successful"))
    .catch(() => console.log("Connection to MongoDB failed"));

const {APP_PORT} = process.env;
const app = express();
app.use(express.static(path.resolve(__dirname, "../../bin/client")));
app.use(bodyParser.json());
app.use("/api/auth", userRoutes);
app.use("/api/tree", treeRoutes);
app.get("/*", (req, res) => {
    // eslint-disable-next-line no-sequences
    res.sendFile(
        path.resolve(__dirname, "../../bin/client/index.html"),
        err => {
            if (err) {
                res.status(500).send(err);
            }
        },
    );
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);

async function payroll() {
    const time = Date.now();
    const usersQuery = await User.find({});
    // create array with every users to map easily afterwood
    usersQuery.forEach(async user => {
        const previousLeaves = user.leaves;

        const missedPay = Math.round((time - user.lastPay) / 3000); //period of 15 minutes missed
        let newLeaves = 0;
        let totalLeaves = 0;
        const treeQuery = await Tree.find({owner: user._id});

        treeQuery.forEach(tree => {
            const leavesOnTree = tree.diameter * tree.height;
            totalLeaves = Math.ceil(totalLeaves + leavesOnTree);

            if (missedPay >= 4) {
                newLeaves = Math.round(
                    previousLeaves / 2 + totalLeaves * missedPay,
                );
            } else {
                newLeaves = Math.round(
                    previousLeaves + totalLeaves * missedPay,
                );
            }
        });

        console.log(`missed play ${missedPay}`);

        console.log(newLeaves);

        //update leaves value for current user
        await User.updateOne(
            {_id: user._id},
            {leaves: newLeaves, lastPay: time},
        );
    });
}

async function leavesLoss() {
    const usersQuery = await User.find({});
    usersQuery.forEach(async user => {
        const newAmountLeaves = user.leaves / 2;
        await User.updateOne({_id: user}, {leaves: newAmountLeaves});
    });
}

setInterval(payroll, 3000);
setInterval(leavesLoss, 12000);
