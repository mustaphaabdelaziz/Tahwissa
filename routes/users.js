const express = require("express");
const passport = require("passport");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const multer = require("multer");
const { profilestorage } = require("../cloudinary");
const upload = multer({ storage: profilestorage });
router
  .route("/register")
  .get(users.renderRegisterForm)
  .post(upload.single("image"), catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );
router.route("/logout").get(users.logout);
module.exports = router;
