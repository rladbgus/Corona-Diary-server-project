const { Content } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { contentId } = req.params;

    try {
      await Content.increment("like", {
        by: 1,
        where: { id: contentId },
      });
      res.status(200).send("Plus!");
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
