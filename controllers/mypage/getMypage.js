const db = require("../../models");

// 마이페이지에서 정보를 가져올 때 사용합니다.
module.exports = {
  get: (req, res) => {
    const { email } = req.body;
    db.User.findOne({
      where: { email: email },
      attributes: ["email", "nickName", "age", "city"],
    }).then((userInfo) => {
      if (userInfo) {
        res.status(200).send(userInfo);
      } else {
        res.status(404).send("잘못된 요청입니다.");
      }
    });
  },
};
