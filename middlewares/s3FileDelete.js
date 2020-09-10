const db = require("../models");
const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
// AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");
let s3 = new AWS.S3();

module.exports = {
  fileDeleteMiddleware: async (req, res, next) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
    const { contentId } = req.params;

    const content = await db.Content.findOne({
      where: { id: contentId, userId: decoded.id },
    });
    if (!content.referenceFile) {
      console.log("기존 이미지 파일이 존재하지 않습니다.");
    } else {
      let key = content.referenceFile.substring(58);
      const params = { Bucket: "corona-diary-test", Key: key };

      s3.deleteObject(params, (err, data) => {
        if (err) {
          return res.json({
            success: false,
            errors: {
              title: "Image Upload Error",
              detail: err.message,
              error: err,
            },
          });
        }
      });
    }
    next();
  },
};
