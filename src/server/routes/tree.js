const express = require("express");
const router = express.Router();
const treeCtrl = require("../controllers/tree");
const auth = require("../middleware/auth");

router.get("/", treeCtrl.getAllTrees);
router.get("/:id", treeCtrl.getOneTree);

module.exports = router;
