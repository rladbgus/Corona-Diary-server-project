const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { contentController } = require("../controllers");

// 작성된 글을 불러올 때 사용합니다.
router.get("/:contentId", contentController.getContent.get);
router.patch("/:contentId/like", contentController.minusLike.patch);
router.post("/:contentId/like", contentController.plusLike.post);

router.use("/", authMiddleware);

// 글을 작성할 때 사용합니다.
router.post("/", contentController.makeContent.post);

// 글을 수정할 때 사용합니다.
router.patch("/:contentId", contentController.patchContent.patch);

// 글을 삭제할 때 사용합니다.
router.delete("/:contentId", contentController.deleteContent.delete);

module.exports = router;
