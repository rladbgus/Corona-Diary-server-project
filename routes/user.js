const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const socialAuthMiddleware = require("../middlewares/socialAuth");
const { userController } = require("../controllers");

router.post("/signup", userController.signup.post);
router.post("/signup/email", userController.checkEmail.post);
router.post("/signup/nickName", userController.checkNickName.post);
router.post("/login", userController.login.post);

router.post("/socialLogin", userController.socialLogin.post);
router.use("/socialInfo", socialAuthMiddleware);
router.post("/socialInfo", userController.socialInfo.post);

router.use("/", authMiddleware);

router.get("/check", userController.checkTocken.check);
router.patch("/signout", userController.signout.patch);
module.exports = router;
