const { User } = require("../../models");
const jwt = require("jsonwebtoken");

//socialLogin으로 처음 회원가입하는 유저가 임시토큰과 함께 추가정보를 보내면
//정식으로 로그인할 수 있게 정식토큰을 돌려줍니다.
module.exports = {
  post: async (req, res) => {
    const { password, nickName, age, city } = req.body;
    const socialToken = req.headers["x-access-token"];
    const decoded = jwt.verify(socialToken, req.app.get("jwt-social-secret"));

    try {
      //공백 걸러주기
      if (!password || !nickName || !age || !city) {
        return res.status(404).json({ message: "login fail; Wrong info" });
      }

      const sameNickName = await User.findOne({
        where: { nickName: nickName },
      });

      //닉네임중복 확인
      if (sameNickName) {
        return res.status(409).send({ message: "nickName already exists" });
      } else {
        //닉네임 중복이 아니라면 유저의 추가정보를 넣어주고 저장.
        //유저의 email로 salt값을 찾아서 password암호화해서 update
        await User.updatePassword(decoded.email, password);
        await User.update(
          {
            nickName: nickName,
            age: age,
            city: city,
          },
          { where: { email: decoded.email } }
        );
        const realUser = await User.findOne({
          where: { email: decoded.email },
        });
        //정식토큰발급
        const secret = req.app.get("jwt-secret");
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
