var mongoose = require("mongoose");

var UserModel = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  courses: Array,
});

module.exports = mongoose.model("User", UserModel);
