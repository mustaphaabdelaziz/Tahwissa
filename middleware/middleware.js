var Post = require("../models/post");
const Review = require('../models/review');
const { postSchema, reviewSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
// ALL MIDDLEWARE GOES HERE

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};
module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/posts/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/posts/${id}`);
  }
  next();
};

module.exports.validatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    console.log(msg);
    throw new ExpressError(msg, 500);
  } else next();
};
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(" ");
    console.log(msg);
    throw new ExpressError(msg, 500);
  } else next();
};
