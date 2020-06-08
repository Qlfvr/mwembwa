const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const treeCtrl = require("../controllers/tree");

router.get("/", auth, treeCtrl.getAllTrees);
// router.post("/", auth, treeCtrl.createTree);

module.exports = router;
