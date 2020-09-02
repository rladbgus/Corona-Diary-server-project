const db = require("../../models");
const jwt = require("jsonwebtoken");

// 글을 작성할 때 사용합니다.
module.exports = {
  post: (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
    const {
      title,
      text,
      covid_date,
      referenceFile,
      q_temp,
      q_resp,
      q_cough,
      q_appet,
      q_sleep,
      q_fatigue,
      q_psy,
    } = req.body;

    try {
      db.User.findOne({ where: { email: decoded.email } }).then((user) => {
        if (user.id) {
          db.Content.create({
            title: title,
            text: text,
            covid_date: covid_date,
            referenceFile: referenceFile,
            q_temp: q_temp,
            q_resp: q_resp,
            q_cough: q_cough,
            q_appet: q_appet,
            q_sleep: q_sleep,
            q_fatigue: q_fatigue,
            q_psy: q_psy,
            userId: user.id,
          }).then((result) => {
            if (result) {
              res.status(201).send({
                message: "게시글이 작성되었습니다.",
                contentId: result.id,
              });
            } else {
              res.status(404).send("잘못된 요청입니다.");
            }
          });
        } else {
          res.status(404).send("잘못된 요청입니다. user.id가 없음");
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

// 유저의 고유 id 접근 방법:
// 1. 유저가 로그인을 했을 때, 해당 유저의 id 값을 건내서 준다.
// => 그러면 해당 유저가 글을 작성할 때, 자신의 id를 바디에 함께 넘긴다.
// 2. 토큰 디코디드의 이메일로 해당 유저를 찾아 id값을 찾아내서 해결한다.
