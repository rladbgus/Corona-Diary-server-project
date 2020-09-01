const { Comment } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  post: async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = await jwt.verify(token, req.app.get("jwt-secret"));
    const { contentId, comment } = req.body;

    try {
      if (!comment) {
        res.status(400).send({ message: "Wrong Comment" });
      } else {
        Comment.create({
          comment: comment,
          contentId: contentId,
          userId: decoded.id,
        }).then((result) => {
          res
            .status(201)
            .send({ message: "Comment created!", commentId: result.id });
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Server Error" });
    }
  },
};
