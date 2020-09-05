const { Content } = require("../../models");

module.exports = {
  patch: async (req, res) => {
    const { contentId } = req.params;

    try {
      await Content.decrement("like", {
        by: 1,
        where: { id: contentId },
      });
      const minusLike = await Content.findOne({
        where: { id: contentId },
        attributes: ["like"],
      });
      res.status(200).send(minusLike);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
