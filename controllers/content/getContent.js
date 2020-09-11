const db = require("../../models");
const jwt = require("jsonwebtoken");
// 작성된 글을 불러올 때 사용합니다.
module.exports = {
  get: async (req, res) => {
    const { contentId } = req.params;
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
    try {
      const findContent = await db.Content.findOne({
        where: { id: contentId },
        attributes: [
          "id",
          "title",
          "text",
          "q_temp",
          "q_resp",
          "q_cough",
          "q_appet",
          "q_sleep",
          "q_fatigue",
          "q_psy",
          "covid_date",
          "referenceFile",
          "createdAt",
        ],
        include: [
          { model: db.User, as: "user", attributes: ["id", "nickName"] },
          {
            model: db.Comment,
            as: "comment",
            attributes: ["id", "comment", "depth", "group", "createdAt"],
            include: [
              { model: db.User, as: "user", attributes: ["id", "nickName"] },
            ],
          },
          {
            model: db.Tag,
            as: "tag",
            attributes: ["id", "tag"],
            through: {
              attributes: [],
            },
          },
        ],
        order: [
          [{ model: db.Comment, as: "comment" }, "group", "DESC"],
          [{ model: db.Comment, as: "comment" }, "depth", "ASC"],
          [{ model: db.Comment, as: "comment" }, "createdAt", "ASC"],
        ],
      });
      const userLike = await db.Like.findOne({
        attributes: ["like"],
        where: { userId: decoded.id, contentId: contentId },
      });

      const likeNum = await db.Like.count({
        where: { contentId: contentId, like: true },
      });

      if (findContent) {
        if (!userLike) {
          res.status(200).send({
            Content: findContent,
            like: likeNum,
            userLike: false,
          });
        } else {
          res.status(200).send({
            Content: findContent,
            like: likeNum,
            userLike: userLike.like,
          });
        }
      } else {
        res.status(404).send("잘못된 요청입니다.");
      }
    } catch (err) {
      (err) => {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
      };
    }
  },
};
