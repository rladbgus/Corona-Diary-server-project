const { User } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { nickName } = req.body;
    try {
      if (!nickName) {
        return res.status(400).send({ message: "Invalid NickName" });
      } else {
        const checkNickName = await User.findOne({
          where: { nickName: nickName },
        });
        if (checkNickName) {
          return res.status(409).send({ message: "NickName already exists" });
        } else {
          return res.status(200).send({ message: "NickName is available" });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Server Error" });
    }
  },
};
