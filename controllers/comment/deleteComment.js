const { Comment } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  delete: async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = await jwt.verify(token, req.app.get("jwt-secret"));
    const { commentId } = req.params;
    try {
      const deleteComment = await Comment.findOne({
        where: {
          id: commentId,
          userId: decoded.id,
        },
      });
      if (deleteComment === null) {
        res.status(404).json({ message: "Comment not exists" });
      } else {
        await Comment.destroy({
          where: { id: commentId, userId: decoded.id },
        });
        // 삭제가 성공되었으면 200 응답
        res.status(200).json({ message: "Comment deleted" });
      }
    } catch (err) {
      // server error handling
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
