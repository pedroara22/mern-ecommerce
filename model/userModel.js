var mongoose = require("mongoose");

var UserModel = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  cursos: Array,
});

module.exports = mongoose.model("User", UserModel);
