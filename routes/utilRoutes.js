var router = require("express").Router();

router.get("/user", (req, res) => {
    req.user ? res.json(req.user) : res.json({ error: true });
  });

  module.exports = router;