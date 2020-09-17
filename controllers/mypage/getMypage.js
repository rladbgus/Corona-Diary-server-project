const db = require("../../models");
const jwt = require("jsonwebtoken");

// 마이페이지에서 정보를 가져올 때 사용합니다.
module.exports = {
  get: async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));

    try {
      const user = await db.User.findOne({
        where: { email: decoded.email },
        attributes: ["email", "nickName", "age", "city"],
      });

      const content = await db.Content.findAll({
        where: { userId: decoded.id },
        attributes: [
          "id",
          "q_temp",
          "q_resp",
          "q_cough",
          "q_appet",
          "q_sleep",
          "q_fatigue",
          "q_psy",
          "createdAt",
        ],
      });
      if (user) {
        res.status(200).send({ user: user, content: content });
      } else {
        res.status(404).send("잘못된 요청입니다.");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
