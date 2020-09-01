const express = require("express");
const router = express.Router();
const { contentListController } = require("../controllers");

router.get("/contentList", contentListController.contentList.get);
router.get("/myContentList", contentListController.myContentList.get);

module.exports = router;
