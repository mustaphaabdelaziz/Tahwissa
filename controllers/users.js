const User = require("../models/user");
module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register");
};
module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body.user;
    const username = (
      req.body.user.firstname +
      "_" +
      req.body.user.lastname
    ).toLowerCase();

    const user = new User({ ...req.body.user, email, username });
    user.picture = {
      url: req.file.path,
      filename: req.file.filename,
    };
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Hawassni");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};
module.exports.login = (req, res) => {
  req.flash("success", `Welcome Back ${req.body.username}`);
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};
module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Goodbey");
  res.redirect("/campgrounds");
};
