const { User } = require("../../models");
const jwt = require("jsonwebtoken");

//socialLogin으로 처음 회원가입하는 유저가 임시토큰과 함께 추가정보를 보내면
//정식으로 로그인할 수 있게 정식토큰을 돌려줍니다.
module.exports = {
  post: async (req, res) => {
    const { nickName, age, city } = req.body;
    const socialToken = req.headers["x-access-token"];
    const decoded = jwt.verify(socialToken, req.app.get("jwt-social-secret"));
    const secret = req.app.get("jwt-secret");

    try {
      const sameNickName = await User.findOne({
        where: { nickName: nickName },
      });
      if (sameNickName) {
        return res.status(409).send({ message: "nickName already exists" });
      } else {
        const realUser = await User.Create({
          where: { email: decoded.email },
          defaults: {
            nickName: nickName,
            age: age,
            city: city,
          },
        });
        const token = jwt.sign(
          { email: realUser.email, id: realUser.id },
          secret,
          {
            expiresIn: 86400,
          }
        );
        res.status(200).json({
          message: "login success!",
          nickName: realUser.nickName,
          token: token,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Server Error" });
    }
  },
};
