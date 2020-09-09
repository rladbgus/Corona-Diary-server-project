const { User } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  patch: async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = await jwt.verify(token, req.app.get("jwt-secret"));

    try {
      await User.update(
        {
          email: "deleted@deleted.com",
          password: "deleted",
          nickName: "",
        },
        { where: { email: decoded.email } }
      );

      res.status(200).json({ message: "signout success!" });
    } catch (err) {
      // server error handling
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
