const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/set-bonus-leaves", auth, userCtrl.setBonusLeaves);

module.exports = router;
