const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.get("/user-infos", auth, userCtrl.getUserInfos);

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/set-bonus-leaves", auth, userCtrl.setBonusLeaves);

module.exports = router;
