const db = require("../../models");

// 작성된 글을 불러올 때 사용합니다.
module.exports = {
  get: async (req, res) => {
    const { contentId } = req.params;

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
          [{ model: db.Comment, as: "comment" }, "createdAt", "DESC"],
        ],
      });

      const likeNum = await db.Like.count({
        where: { contentId: contentId, like: true },
      });

      if (findContent) {
        res.status(200).send({ Content: findContent, like: likeNum });
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
