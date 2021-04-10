const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Post = require("../models/post");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware/middleware");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const reviews = require("../controllers/reviews");
router
  .route("/")
  .post(isLoggedIn, validateReview, catchAsync(reviews.createReview));

router
  .route("/:reviewId")
  .delete(isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));
module.exports = router;
