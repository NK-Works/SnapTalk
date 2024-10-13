/* This code is made by Anneshu Nag, Student ID: 2210994760 */
require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");
const flash = require("connect-flash");
const { connectMongoDb } = require("./dbconnect/connection"); // To connect to the database

// The routers
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const userModel = require("./models/userModel");

// Passport for authentication
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

const app = express();
const port = process.env.PORT || 3000;

// Setting the views dir and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Connecting to MongoDB
connectMongoDb(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("Database Conneted");
  })
  .catch((error) => {
    console.log("Failed Database Connection" + error);
  });

// Middleware Setup
app.use(flash());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "nkworks-secret"
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Session
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use(logger("dev")); // Log

app.use(express.json()); //  JSON parser
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Static for other files needed for the frontend
app.use(express.static(path.join(__dirname, "public")));

// The routes
app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

// 404 route
app.get("*", (req, res) => {
  res.render("404", { title: "page not found" });
});

// Start server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
