const { User } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { email, password, nickName, age, city } = req.body;
    try {
      if (!password) {
        res.status(400).send({ message: "Invalid Password" });
      } else {
        const sameNickName = await User.findOne({
          where: { nickName: nickName },
        });
        if (sameNickName) {
          return res.status(409).send({ message: "nickName already exists" });
        } else {
          await User.findOrCreate({
            where: { email: email },
            defaults: {
              password: password,
              nickName: nickName,
              age: age,
              city: city,
            },
          }).then(async ([user, created]) => {
            if (!created) {
              return res.status(409).send({ message: "email already exists" });
            }
            res.status(201).send({ message: "SignUp success" });
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Server Error" });
    }
  },
};
