const db = require("../../models");
const jwt = require("jsonwebtoken");

// 글을 수정할 때 사용합니다.
module.exports = {
  patch: async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
    const { contentId } = req.params;
    const {
      title,
      text,
      covid_date,
      q_temp,
      q_resp,
      q_cough,
      q_appet,
      q_sleep,
      q_fatigue,
      q_psy,
      tags,
    } = req.body;

    try {
      let bin = req.file;
      if (!bin) {
        bin = "";
      }
      await db.Content.update(
        {
          title: title,
          text: text,
          covid_date: covid_date,
          referenceFile: bin.location,
          q_temp: q_temp,
          q_resp: q_resp,
          q_cough: q_cough,
          q_appet: q_appet,
          q_sleep: q_sleep,
          q_fatigue: q_fatigue,
          q_psy: q_psy,
        },
        { where: { id: contentId, userId: decoded.id } }
      );

      if (!tags || tags === "undefined") {
        res
          .status(201)
          .send({ message: "게시글이 수정되었습니다.", contentId: contentId });
      } else {
        await db.Tag.findAll({
          include: [
            {
              model: db.Content,
              as: "content",
              where: { id: contentId },
              attributes: [],
              through: {
                attributes: [],
              },
            },
          ],
        }).then((results) => {
          results.map((result) => result.destroy());
        });

        const tagArr = tags.split(",");

        tagArr.map((eachTag) => {
          db.Tag.findOrCreate({
            where: { tag: eachTag },
            defaults: { tag: eachTag },
          }).then(([eachTagDetail, created]) => {
            db.User_Tag.findOrCreate({
              where: { userId: decoded.id, tagId: eachTagDetail.id },
              defaults: {
                userId: decoded.id,
                tagId: eachTagDetail.id,
              },
            }).then();
            db.Content_Tag.findOrCreate({
              where: { tagId: eachTagDetail.id, contentId: contentId },
              defaults: {
                contentId: contentId,
                tagId: eachTagDetail.id,
              },
            }).then();
          });
        });
        res
          .status(201)
          .send({ message: "게시글이 수정되었습니다.", contentId: contentId });
      }
    } catch (err) {
      (err) => {
        console.log(err);
        res.status(500).json("Server Error");
      };
    }
  },
};
