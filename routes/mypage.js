const express = require("express");
const router = express.Router();

const { mypageController } = require("../controllers");

// 마이페이지에서 정보를 가져올 때 사용합니다.
router.get("/", mypageController.getMypage.get);
// 마이페이지 정보를 수정할 때 사용합니다.
// router.patch("/", mypageController.patchMypage.patch);
//
// router.post("/", mypageController.postPasswordMypage.post);

module.exports = router;
