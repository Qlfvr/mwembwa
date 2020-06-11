const express = require("express");
const router = express.Router();
const treeCtrl = require("../controllers/tree");
const auth = require("../middleware/auth");

router.get("/", auth, treeCtrl.getAllTrees);
router.get("/:id", auth, treeCtrl.getOneTree);

module.exports = router;
