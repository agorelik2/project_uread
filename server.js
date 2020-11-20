const express = require("express");
const session = require("express-session");
const passport = require("./passport");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

require("dotenv").config();

// express sessions
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: "algbook", //pick a random string to make the hash that is generated secure
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  // console.log("req.session", "=============");
  // console.log("req.session", req.session);
  return next();
});

// passport
app.use(passport.initialize()); // initializes the passport
app.use(passport.session()); // calls serializeUser and deserializeUser

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DBs

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/uread");
// // Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tbook", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
