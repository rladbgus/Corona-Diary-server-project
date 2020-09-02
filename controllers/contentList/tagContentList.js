const db = require("../../models");

module.exports = {
  get: async (req, res) => {
    const { tagId } = req.params;

    try {
      const tagContentList = await db.Content.findAndCountAll({
        attributes: ["id", "title", "text", "createdAt"],
        include: [
          {
            model: db.Tag,
            as: "tag",
            where: { id: tagId },
            attributes: [],
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.status(200).send({ tagContentList: tagContentList });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
