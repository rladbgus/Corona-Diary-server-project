const db = require("../../models");
const jwt = require("jsonwebtoken");

// 글을 작성할 때 사용합니다.
module.exports = {
  post: (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
    const {
      title,
      text,
      covid_date,
      referenceFile,
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
      db.User.findOne({ where: { email: decoded.email, id: decoded.id } }).then(
        (user) => {
          if (user.id) {
            db.Content.create({
              title: title,
              text: text,
              covid_date: covid_date,
              referenceFile: referenceFile,
              q_temp: q_temp,
              q_resp: q_resp,
              q_cough: q_cough,
              q_appet: q_appet,
              q_sleep: q_sleep,
              q_fatigue: q_fatigue,
              q_psy: q_psy,
              userId: user.id,
            }).then((result) => {
              if (result) {
                // 태그 테이블에 저장
                tags.map((eachTag) => {
                  db.Tag.create({ tag: eachTag })
                    .then((eachTagDetail) => {
                      // 태그와 유저의 조인테이블에 저장
                      db.User_Tag.create({
                        userId: decoded.id,
                        tagId: eachTagDetail.id,
                      }).then((eachTagDetail2) => {
                        // 태그와 컨텐츠의 조인테이블에 저장
                        db.Content_Tag.create({
                          contentId: result.id,
                          tagId: eachTagDetail2.tagId,
                        }).then();
                      });
                    })
                    .catch((err) => {
                      console.error(err);
                      res.status(500).send("Server Error");
                    });
                });
                res.status(201).send({
                  message: "게시글이 작성되었습니다.",
                  contentId: result.id,
                });
              } else {
                res.status(404).send("잘못된 요청입니다.");
              }
            });
          } else {
            res.status(404).send("잘못된 요청입니다. user.id가 없음");
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
