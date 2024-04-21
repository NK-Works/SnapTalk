/* This code is made by Anneshu Nag, Student ID: 2210994760 */
const express = require('express')
const authRouter = express.Router();

const passport = require("passport");

const { renderRegister,
  renderLogin, 
  logout,
  } = require('../authentication/authenticationHandler');

authRouter.get("/", renderRegister);

authRouter.get("/login", renderLogin);

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

authRouter.get("/logout", logout);

module.exports = authRouter;
