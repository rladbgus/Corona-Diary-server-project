const express = require("express");
const router = express.Router();
const path = require("path");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
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

// s3에 사진 저장할 때 사용합니다.
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");
let s3 = new AWS.S3();
let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "corona-diary-test",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read-write",
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
  }),
  //   limits: { fileSize: 5 * 1024 * 1024 }, // 사진 용량제한두기
});
router.post("/upload", upload.single("imgFile"), (req, res, next) => {
  try {
    let imgFileUrl = { url: req.file.location };
    res
      .status(201)
      .send({ message: "사진 업로드 완료", imgFileUrl: imgFileUrl });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
