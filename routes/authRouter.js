/* This code is made by Anneshu Nag, Student ID: 2210994760 */
const express = require('express')
const indexRouter = express.Router();

const passport = require("passport");

const { renderRegister,
  renderLogin, 
  logout,
  } = require('../authentication/authenticationHandler');

indexRouter.get("/", renderRegister);

indexRouter.get("/login", renderLogin);

indexRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

indexRouter.get("/logout", logout);

module.exports = indexRouter;
