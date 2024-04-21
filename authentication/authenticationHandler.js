/* This code is made by Anneshu Nag, Student ID: 2210994760 */

// Function to render the register page
function renderRegister(req, res) {
  res.render('register', { messages: req.flash() });
}

// Function to render the login page
function renderLogin(req, res) {
  return res.render("login", { error: req.flash("error") });
}

// Function to logout the user and redirect to login page
function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/login");
  });
}

// Middleware to check if user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");   // Redirect to login page if not authenticated
}

// Export the required functions
module.exports = {
  renderRegister,
  renderLogin,
  isLoggedIn,
  logout
};
