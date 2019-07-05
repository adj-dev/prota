var router = require("express").Router();

module.exports = passport => {
  router.get("/github", passport.authenticate("github"));

  router.get("/logout", function (req, res) {
    req.logout();
    res.json({ success: true });
  });

  router.get(
    "/github/callback",
    passport.authenticate("github"),
    (req, res) => {
      let redirectUrl;
      process.env.NODE_ENV === "production"
        ? (redirectUrl = "https://majestic-mesa-verde-10359.herokuapp.com/")
        : (redirectUrl = "http://localhost:3000/");
      res.redirect(redirectUrl);
    }
  );

  router.get("/status", (req, res) => {
    req.user ? res.json(true) : res.json(false);
  });

  return router;
};
