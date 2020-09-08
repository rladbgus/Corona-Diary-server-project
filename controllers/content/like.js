const { Like } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = {
  post: async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
    const { contentId } = req.params;

    try {
      const [result, created] = await Like.findOrCreate({
        where: { contentId: contentId, userId: decoded.id },
        defaults: { like: true, contentId: contentId, userId: decoded.id },
      });
      if (created) {
        const likeNum = await Like.count({
          where: { contentId: contentId, like: true },
        });
        res.status(200).send({ count: likeNum, like: result.like });
      } else {
        if (result.like) {
          await result.update({ like: false }, { where: { like: true } });
        } else {
          await result.update({ like: true }, { where: { like: false } });
        }
        const likeNum = await Like.count({
          where: { contentId: contentId, like: true },
        });
        res.status(200).send({ count: likeNum, like: result.like });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
