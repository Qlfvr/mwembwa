const express = require("express");
const router = express.Router();

// const auth = require("../middleware/auth");

const treeCtrl = require("../controllers/tree");

router.get("/", treeCtrl.getAllTrees);
// router.post("/", auth, treeCtrl.createTree);

router.get("/:id", treeCtrl.getOneTree);
// router.post("/", auth, treeCtrl.createTree);

module.exports = router;
