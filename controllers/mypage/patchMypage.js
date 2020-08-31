const db = require("../../models");
const jwt = require("jsonwebtoken");

// 마이페이지 정보를 수정할 때 사용합니다.
module.exports = {
  patch: (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
    const { password, age, city } = req.body;

    try {
      db.User.updatePassword(decoded.email, password);
      db.User.update(
        {
          age: age,
          city: city,
        },
        { where: { email: decoded.email } }
      ).then((modified) => {
        if (modified) {
          res.status(201).send(modified);
        } else {
          res.status(404).send("잘못된 요청입니다.");
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("에러");
    }
  },
};

// 궁금한점: 토큰으로 인증과정을 거친 후에, 바디로 이메일을 엉뚱한 것으로 보내면?
