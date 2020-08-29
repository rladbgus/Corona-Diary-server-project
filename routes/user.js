const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

router.post("/signup", userController.signup.post);
router.post("/signup/email", userController.checkEmail.post);
router.post("/signup/nickName", userController.checkNickName.post);

module.exports = router;
