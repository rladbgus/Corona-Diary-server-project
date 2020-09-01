const { Content } = require("../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const contentList = await Content.findAll({
        attributes: ["id", "title", "text", "createdAt"],
      });
      res.status(200).send({ contentList: contentList });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
