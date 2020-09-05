const express = require("express");
const router = express.Router();
const { contentListController } = require("../controllers");
const authMiddleware = require("../middlewares/auth");

router.get("/contentList", contentListController.contentList.get);
router.get("/mainContentList", contentListController.mainContentList.get);

router.use("/", authMiddleware);

router.get("/:tagId/contentList", contentListController.tagContentList.get);
router.get("/myContentList", contentListController.myContentList.get);
module.exports = router;
