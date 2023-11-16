function index(req, res) {
  res.send("Benvenuto " + req.user.username);
}

module.exports = {
  index,
};