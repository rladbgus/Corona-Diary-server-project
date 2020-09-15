const { User } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    const secret = req.app.get("jwt-secret");
    try {
      const result = await User.findOneByEmailAndPassword(email, password);

      // 존재하지 않는 유저
      if (result === null) {
        res.status(404).json({ message: "login fail; Wrong info" });
      } else {
        // 24 hours
        const token = jwt.sign({ email: email, id: result.id }, secret, {
          expiresIn: 86400,
        });
        // 로그인 성공
        res.status(200).json({
          message: "login success!",
          nickName: result.nickName,
          token: token,
          createdAt: result.createdAt,
        });
      }
    } catch (err) {
      // server error handling
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
