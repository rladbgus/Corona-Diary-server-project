module.exports = {
  check: (req, res) => {
    res.json({
      success: true,
      decoded: req.decoded,
    });
  },
};
