const express = require("express");
const router = express.Router();

const { mypageController } = require("../controllers");

// 마이페이지에서 정보를 가져올 때 사용합니다.
router.get("/", mypageController.getMypage.get);

// 마이페이지에서 정보를 수정할 때 사용합니다.
router.patch("/", mypageController.patchMypage.patch);

// 마이페이지에서 수정하기 위해 다시금 비밀번호를 확인할 때 사용합니다.
router.post("/", mypageController.postPasswordMypage.post);

module.exports = router;
