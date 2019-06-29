require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require("passport");

let session = require("express-session")({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
});

const GitHubStrategy = require("passport-github2").Strategy;

let strategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => done(null, profile)
);

//use Github OAuth2 strategy
passport.use(strategy);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((profile, done) => {
  console.log(profile);
  user = {
    name: profile.displayName,
    username: profile.login,
    id: profile.id,
    projects: ["awdhflkwnee23ro2j3jr", "awdhflkw8dh3ro2j3jr"]
  };
  done(null, user);
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(require("cookie-parser")());

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Define API routes here

app.use(require("./routes/authRoutes")(passport));
app.use("/api", require("./routes/apiRoutes"));

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
