const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const {
  isLoggedIn,
  isAuthor,
  validatePost,
} = require("../middleware/middleware");
const catchAsync = require("../utils/catchAsync");
const posts = require("../controllers/posts");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
// groupe the diffrent http verbs under the same route
router
  .route("/")
  .get(catchAsync(posts.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validatePost,
    catchAsync(posts.createPost)
  );

router.route("/new").get(isLoggedIn, posts.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(posts.showPost))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
    validatePost,
    catchAsync(posts.updatePost)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(posts.deletePost));
router
  .route("/:id/edit")
  .get(isLoggedIn, isAuthor, catchAsync(posts.renderEditForm));

module.exports = router;
