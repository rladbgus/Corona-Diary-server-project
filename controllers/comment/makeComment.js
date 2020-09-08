const { Comment } = require("../../models");
const jwt = require("jsonwebtoken");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;
module.exports = {
  post: async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = await jwt.verify(token, req.app.get("jwt-secret"));
    const { contentId, comment, commentId } = req.body;

    try {
      //comment===''일 경우
      if (!comment) {
        res.status(400).send({ message: "Wrong Comment" });
      } else {
        //parent일 경우
        if (!commentId) {
          const parentComment = await Comment.create({
            comment: comment,
            contentId: contentId,
            userId: decoded.id,
          });
          await parentComment.update({
            group: parentComment.id,
          });
          res.status(201).send({
            message: "ParentComment created!",
            commentId: parentComment,
          });
        } else {
          //child일 경우
          //부모가 child인지 구분한다.
          // const isChildComment = await Comment.findOne({
          //   where: { id: commentId, depth: { [Op.ne]: 0 } },
          // });
          const childComment = await Comment.create({
            comment: comment,
            contentId: contentId,
            userId: decoded.id,
            group: commentId,
            depth: 1,
          });
          // await childComment.increment("depth", { by: 1 });
          res
            .status(201)
            .send({ message: "ChildComment created!", comment: childComment });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Server Error" });
    }
  },
};
