const jwt = require("jsonwebtoken");
const { User } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const token = req.headers["x-access-token"];
    const { password } = req.body;
    try {
      const decoded = await jwt.verify(token, req.app.get("jwt-secret"));
      const result = await User.findOneByEmailAndPassword(
        decoded.email,
        password
      );
      // 존재하지 않는 유저
      if (result === null) {
        res.status(404).json({ message: "Wrong Password" });
      } else {
        // 24 hours
        res.status(200).json({ message: "Password Correct!" });
      }
    } catch (err) {
      // server error handling
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
