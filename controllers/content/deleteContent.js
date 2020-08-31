const db = require("../../models");
const jwt = require("jsonwebtoken");

// 글을 삭제할 때 사용합니다.
module.exports = {
  delete: (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
  },
};
