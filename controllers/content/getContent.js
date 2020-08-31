const db = require("../../models");
const jwt = require("jsonwebtoken");

// 작성된 글을 불러올 때 사용합니다.
module.exports = {
  get: (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
  },
};
