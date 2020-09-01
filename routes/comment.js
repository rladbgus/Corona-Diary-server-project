const express = require("express");
const router = express.Router();
const { commentController } = require("../controllers");

router.post("/", commentController.makeComment.post);

module.exports = router;
