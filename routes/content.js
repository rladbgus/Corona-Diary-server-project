const express = require("express");
const router = express.Router();

const { contentController } = require("../controllers");

// 글을 작성할 때 사용합니다.
router.post("/", contentController.makeContent.post);

// 작성된 글을 불러올 때 사용합니다.
router.get("/:contentId", contentController.getContent.get);

// 글을 수정할 때 사용합니다.
router.patch("/", contentController.patchContent.patch);

// 글을 삭제할 때 사용합니다.
router.delete("/", contentController.deleteContent.delete);

module.exports = router;
