const { Comment } = require("../../models");

module.exports = {
  delete: async (req, res) => {
    const { commentId } = req.params;
    try {
      const comment = await Comment.findOne({
        where: {
          id: commentId,
        },
      });
      if (comment === null) {
        res.status(404).json({ message: "Comment not exists" });
      } else {
        await Comment.destroy({
          where: { id: commentId },
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
