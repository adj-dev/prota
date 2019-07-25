require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const userController = require('./controllers/userController');

//connect to MongodDB
const MONGODB_URI = process.env.MONGODB_URI
  || "mongodb://localhost/sitedb";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

let session = require("express-session")({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
});

const GitHubStrategy = require("passport-github2").Strategy;

let strategy = new GitHubStrategy(
  {
    clientID: process.env.NODE_ENV === "production" ? process.env.GITHUB_CLIENT_ID_PRODUCTION : process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.NODE_ENV === "production" ? process.env.GITHUB_CLIENT_SECRET_PRODUCTION : process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === "production" ? null : "/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => done(null, profile)
);

//use Github OAuth2 strategy
passport.use(strategy);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((profile, done) => {
  if (!profile) done(null, {});
  //console.log(profile);
  user = {
    username: profile.username,
    avatar_url: profile._json.avatar_url, //profile.photos[0].value, 
    display_name: profile.displayName,
    email: (profile.emails ? profile.emails[0].value : null)
  }
  userController.createOrUpdate(user)
    .then(dbUser => done(null, dbUser))
    .catch(err => done(err, null));
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

app.use("/auth", require("./routes/authRoutes")(passport));
app.use("/api", require("./routes/apiRoutes"));
app.use("/util", require("./routes/utilRoutes"));

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//OLD Code 7-25 AS
// app.listen(PORT, () => {
//   console.log(`🌎 ==> API server now on port ${PORT}!`);
// });

//SocketIO Test Code //
//require the http module for socketIO 
const http = require("http").Server(app);
// require the socket.io module
const io = require("socket.io");
//integrating socketio
socket = io(http);
// demo socketIO code //
socket.on("connection", socket => {
  console.log("user connected");
  if(typeof(total_connections) === "undefined"){
    total_connections = 0;
    // console.log("total connections = ",total_connections);

  }
  total_connections ++;
  console.log("|Server| Total socketIO client connections: ",total_connections);

  socket.on("disconnect", function() {
    console.log("user disconnected");
    total_connections -= 1;
    console.log("|Server| Total socketIO client connections: ",total_connections);
  });
  //user object coming from client (code needs work)
  socket.on("UserMessage", function(user) {
    console.log(user.username + " logged in.");
    console.log("They have "+user.projects.length+" projects on their account.");
    console.log("Avatar located at: ",user.avatar_url);
    console.log("Broadcasting avatarUrl")
    //sends avatarUrl received from one user back to all users
    socket.emit("FromServerAvatarUrl",user.avatar_url)
    let timeStamp = new Date().toLocaleTimeString();
    //sends the time last user logged in
    socket.emit("LastUserTime", timeStamp)
  });
  
  socket.on("TasksMessage", function(tasks) {
    console.log("They have "+tasks.length+" tasks on their account.");
  });
});
// end socketIO test code //

//Connect Server
//socketIO required change from app.listen to http.listen
http.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});