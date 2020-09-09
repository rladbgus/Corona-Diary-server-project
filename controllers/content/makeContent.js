const db = require("../../models");
const jwt = require("jsonwebtoken");

// 글을 작성할 때 사용합니다.
module.exports = {
  post: async (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
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
      const content = await db.Content.create({
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
        userId: decoded.id,
      });

      if (!content) {
        res.status(404).send("잘못된 요청입니다.");
      } else {
        if (tags.length === 0) {
          res.status(201).send({
            message: "게시글이 작성되었습니다.",
            contentId: content.id,
          });
        } else {
          tags.map((eachTag) => {
            // findOrCreate 사용해서 태그 중복 활용하기
            db.Tag.findOrCreate({
              where: { tag: eachTag },
              defaults: { tag: eachTag },
            }).then(([eachTagDetail, created]) => {
              // 태그와 유저의 조인테이블에 저장
              db.User_Tag.findOrCreate({
                where: { tagId: eachTagDetail.id },
                defaults: {
                  userId: decoded.id,
                  tagId: eachTagDetail.id,
                },
              }).then();
              db.Content_Tag.findOrCreate({
                where: { tagId: eachTagDetail.id, contentId: content.id },
                defaults: {
                  contentId: content.id,
                  tagId: eachTagDetail.id,
                },
              }).then();
            });
          });
          res.status(201).send({
            message: "게시글이 작성되었습니다.",
            contentId: content.id,
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
