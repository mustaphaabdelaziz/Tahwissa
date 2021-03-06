const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

// https://res.cloudinary.com/douqbebwk/image/upload/w_300/v1600113904/YelpCamp/gxgle1ovzd2f3dgcpass.png
// create a virtual property called thumbnail and it represent the url property
// we just need to add some text to the url to get used of a service
// which is make the images has the properties of a thumbnail + we put w_200
// after the upload word
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});
// By default, Mongoose does not include virtuals when you convert
// a document to JSON
// To include virtuals in json(), you need to set the toJSON schema option to
// { virtuals: true }.
const opts = { toJSON: { virtuals: true } };

const PostSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

PostSchema.virtual("properties.popUpMarkup").get(function () {
  return `
  <strong><a class="text-decoration-none" href="/posts/${this._id}">${this.title}
  <img class = "mapPicture thumbnail" src="${this.images[0].url}" />
  </a><strong>`;
});

PostSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});
// compiling our schema into a Model, then export it
// A model is a class with which we construct documents. 
module.exports = mongoose.model("Post", PostSchema);
