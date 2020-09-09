const db = require("../../models");
const jwt = require("jsonwebtoken");

// 글을 수정할 때 사용합니다.
module.exports = {
  patch: (req, res) => {
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

      db.Content.findOne({ where: { id: contentId, userId: decoded.id } })
        .then((content) => {
          db.Content.update(
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
            { where: { id: content.id, userId: decoded.id } }
          ).then((contentUpdated) => {
            if (contentUpdated) {
              // 해당 태그를 삭제하면, 유저 그리고 컨텐츠와의 관계는 삭제된다.
              db.Content_Tag.findAll({ where: { contentId: contentId } }).then(
                (tags) => {
                  tags.map((eachTag) => {
                    db.Content_Tag.destroy({
                      where: { contentId: contentId, tagId: eachTag.tagId },
                    }).then();
                  });
                }
              );
              tags.map((eachTag) => {
                // findOrCreate 사용해서 태그 중복 활용하기
                db.Tag.findOrCreate({
                  where: { tag: eachTag },
                  defaults: { tag: eachTag },
                })
                  .then(([eachTagDetail, created]) => {
                    // 태그와 유저의 조인테이블에 저장
                    db.User_Tag.findOrCreate({
                      where: { tagId: eachTagDetail.id },
                      defaults: {
                        userId: decoded.id,
                        tagId: eachTagDetail.id,
                      },
                    }).then(([eachTagDetail2, created]) => {
                      // 태그와 컨텐츠의 조인테이블에 저장
                      db.Content_Tag.create({
                        contentId: contentId,
                        tagId: eachTagDetail2.tagId,
                      }).then();
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                    res.status(500).send("Server Error");
                  });
              });
              res.status(201).send({ message: "수정되었습니다" });
            } else {
              res.status(404).send("잘못된 요청입니다");
            }
          });
        })
        .catch((err) => {
          console.error("contentId 값이 잘못되었습니다.", err);
        });
    } catch (err) {
      (err) => {
        console.log(err);
        res.status(500).json("Server Error");
      };
    }
  },
};
