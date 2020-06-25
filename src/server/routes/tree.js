const express = require("express");
const router = express.Router();
const treeCtrl = require("../controllers/tree");
const auth = require("../middleware/auth");

router.get("/", treeCtrl.getAllTrees);
router.post("/set-random-trees", auth, treeCtrl.setRandomTrees);
router.post("/lock-tree/:treeId", auth, treeCtrl.lockTree);
router.post("/comment/:treeId/", auth, treeCtrl.addComment);
router.post("/buy-one/:treeId/", auth, treeCtrl.buyOne);

module.exports = router;
