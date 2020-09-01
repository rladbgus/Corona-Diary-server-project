const db = require("../../models");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../../models");

// 작성된 글을 불러올 때 사용합니다.
module.exports = {
  get: (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
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
        ],
      }).then((contentDatail) => {
        if (contentDatail) {
          res.status(200).send({ message: "성공!", result: contentDatail });
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
