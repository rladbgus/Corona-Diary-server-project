const db = require("../../models");

// 작성된 글을 불러올 때 사용합니다.
module.exports = {
  get: (req, res) => {
    const { contentId } = req.params;

    try {
      db.Content.findOne({
        where: { id: contentId },
        attributes: [
          "id",
          "title",
          "text",
          "covid_date",
          "referenceFile",
          "like",
          "createdAt",
        ],
        include: [
          { model: db.User, as: "user", attributes: ["id", "nickName"] },
          {
            model: db.Comment,
            as: "comment",
            attributes: ["id", "comment", "createdAt"],
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
        order: [[{ model: db.Comment, as: "comment" }, "createdAt", "DESC"]],
      }).then((contentDetail) => {
        if (contentDetail) {
          res.status(200).send({ contentDetail: contentDetail });
        } else {
          res.status(404).send("잘못된 요청입니다.");
        }
      });
    } catch (err) {
      (err) => {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
      };
    }
  },
};
