const { User } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { email } = req.body;
    try {
      if (!email) {
        return res.status(400).send({ message: "Invalid Email" });
      } else {
        const checkEmail = await User.findOne({
          where: { email: email },
        });
        if (checkEmail) {
          return res.status(409).send({ message: "Email already exists" });
        } else {
          return res.status(200).send({ message: "Email is available" });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Server Error" });
    }
  },
};
