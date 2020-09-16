const path = require("path");
require("dotenv").config(path.join(__dirname, "../../", "env"));

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
// token 검증 및 user정보 반환
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

module.exports = {
  post: async (req, res) => {
    try {
      // const token = req.headers["x-access-token"];
      // const { email, sub } = await verify(token);
      // //   // 기존 유저가 있는지 여부 확인 및 존재하지 않을 경우 자동 생성
      // const [user, created] = await User.findOrCreate({
      //   where: { email },
      //   defaults: { password: sub },
      // });
      // //이미 있는 유저
      // if (!created) {
      //   const secret = req.app.get("jwt-secret");
      //   const realToken = jwt.sign({ email: email, id: user.id }, secret, {
      //     expiresIn: 86400,
      //   });
      //   // 로그인 성공
      //   res.status(200).json({
      //     message: "login success!",
      //     nickName: user.nickName,
      //     token: realToken,
      //   });
      // } else {
      //   //새로 생긴 유저.추가정보를 입력하도록 임시토큰을 발급한다.
      //   const socialSecret = req.app.get("jwt-social-secret");
      //   const socialToken = jwt.sign({ email: email }, socialSecret, {
      //     expiresIn: "1h",
      //   });
      //   //임시토큰 발급
      //   res.status(200).json({
      //     message: "Please put more Info!",
      //     token: socialToken,
      //   });
      // }
      console.log(req.body);
      res.status(200).send(req.body);

      // 채팅방목록 화면으로 리다이렉트
      //   res.redirect('http://localhost:3000/roomlist');
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error" });
    }
  },
};
