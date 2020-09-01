const db = require("../../models");
const jwt = require("jsonwebtoken");

// 글을 삭제할 때 사용합니다.
module.exports = {
  delete: (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
    const { contentId } = req.params;
    try {
      db.Content.findOne({ where: { id: contentId, userId: decoded.id } }).then(
        (selectedContent) => {
          if (!selectedContent) {
            res.status(403).send({ message: "해당 권한이 없습니다" });
          } else {
            db.Content.destroy({
              where: { id: contentId, userId: decoded.id },
            }).then((result) => {
              if (result) {
                res.status(200).send("삭제되었습니다.");
              } else {
                res.status(404).send("잘못된 요청입니다");
              }
            });
          }
        }
      );
    } catch (err) {
      (err) => {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
      };
    }
  },
};
