const Post = require("../models/post");
const { cloudinary } = require("../cloudinary");
// require the geaocoding service only 
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
  const posts = await Post.find({});
  res.render("posts/index", { posts });
};

module.exports.renderNewForm = (req, res) => {
  res.render("posts/new");
};

module.exports.createPost = async (req, res, next) => {
  // the forwardGeocode function turns a single location name 
  // and returns its geographic coordinates.
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.post.location,//place name
      limit: 1,//Limit the number of results returned. (optional, default 5)
    })
    .send();
    // creating a document (new post)
  const post = new Post(req.body.post);
  post.geometry = geoData.body.features[0].geometry;
  // map over the files object and get the images array
  // where each one of them has a filename and a url
  // and add it to the post object
  post.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  post.author = req.user._id;
  post.author = req.user._id;
  await post.save();
  // console.log(post);
  req.flash("success", "Successfully made a new post !!!");
  res.redirect(`/posts/${post._id}`);
};

module.exports.showPost = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!post) {
    req.flash("error", "Cannot find that post !!!");
    return res.redirect("/posts");
  }
  // console.log(post);
  res.render("posts/show", { post });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    req.flash("error", "Cannot find that post!");
    return res.redirect("/posts");
  }
  res.render("posts/edit", { post });
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, {
    ...req.body.post,
  });
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  post.images.push(...imgs);
  await post.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await post.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "Successfully updated post!");
  res.redirect(`/posts/${post._id}`);
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted post");
  res.redirect("/posts");
};
