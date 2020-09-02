const { Content } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  get: async (req, res) => {
    try {
      const token = req.headers["x-access-token"];
      const decoded = await jwt.verify(token, req.app.get("jwt-secret"));

      const myContentList = await Content.findAll({
        attributes: ["id", "title", "text", "createdAt"],
        where: { userId: decoded.id },
        order: [["createdAt", "DESC"]],
        limit: 6,
      });
      res.status(200).send({ contentList: myContentList });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
