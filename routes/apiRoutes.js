var router = require("express").Router();

//router.use(require("./protection"));



router.get("/auth-status", (req, res) => {
  req.user ? res.json(true) : res.json(false);
});

module.exports = router;
