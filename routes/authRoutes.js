var router = require("express").Router();

module.exports = function(passport) {
  router.get("/auth/github", passport.authenticate("github"));

  router.get("/auth/github/callback", passport.authenticate("github"), function(
    req,
    res
  ) {
    let redirectUrl;
    process.env.NODE_ENV === "production"
      ? (redirectUrl = "/")
      : (redirectUrl = "http://localhost:3000/");
    res.redirect(redirectUrl);
  });
  return router;
};
