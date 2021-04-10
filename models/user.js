const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  dateOfBirth: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  picture: ImageSchema,
});
// creating a virtual field named fullname and it's made of firstname and lastname
// this virtual property is not stored in the mongo DB 
UserSchema.virtual("fullname").get(function () {
  return this.firstname + " " + this.lastname;
});
// this gonna add a password field to the user schema.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
