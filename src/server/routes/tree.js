const express = require("express");
const router = express.Router();
const treeCtrl = require("../controllers/tree");
const auth = require("../middleware/auth");

router.get("/", auth, treeCtrl.getAllTrees);
router.post("/set-random-trees", auth, treeCtrl.setRandomTrees);

module.exports = router;
