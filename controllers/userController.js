/* This code is made by Anneshu Nag, Student ID: 2210994760 */
const passport = require("passport");
const userModel = require("../models/userModel");
const { z } = require("zod");
const { registerSchema } = require("../utils/validationSchemas");

// Function to render user profile page
async function userProfile(req, res) {
  const user = await userModel
    .findOne({
      username: req.session.passport.user,
    })
    .populate("posts")
  return res.render("profile", { user });
}

// Function to register a new user
async function registerUser(req, res) {
  try {
    const { username, email, fullname, password} = await registerSchema.parseAsync(req.body);

    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
      req.flash("error", "User already exists.. Try new username!");
      return res.redirect("/");
    }

    const userData = new userModel({ username, email, fullname });

    userModel.register(userData, password, (err, user) => {
      if (err) {
        console.error(err);
        req.flash(
          "error",
          "Email already exists... Try again with new email Addresss!"
        );
        return res.redirect("/");
      }

      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Registration successful. Welcome!");
        return res.redirect("/users/profile");
      });
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      req.flash('error', `One or two input is invalid. Please check again!`);
      res.redirect("/");
    } else {
      console.log(error);
      req.flash("error", "An error occurred during registration.");
      res.redirect("/");
    }
    
  }
}

// Function to search for users
async function search(req, res) {
  const query = req.query.query;

  try {
    // Find users matching the query
    const users = await userModel.find({
      username: { $regex: new RegExp(query, "i") },
    });

    // Sort users based on the number of matches
    const sortedUsers = users.sort((a, b) => {
      const aMatches = (a.username.match(new RegExp(query, "gi")) || []).length;
      const bMatches = (b.username.match(new RegExp(query, "gi")) || []).length;
      return bMatches - aMatches; // Sort in descending order
    });

    res.json(sortedUsers);
  } catch (error) {
    console.error("Error searching for users:", error);
    res.status(500).send("Internal Server Error");
  }
}



// Function to render search page
async function getSearch(req, res) {
  if (req.isAuthenticated()) {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    return res.render("search", { req, user });
  } else {
    return res.render("search", { req });
  }
}

// Function to get user data by user ID
async function user(req, res) {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId).populate("posts");
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
}

// Exporting the required functions
module.exports = {
  userProfile,
  registerUser,
  search,
  getSearch,
  user,
};
