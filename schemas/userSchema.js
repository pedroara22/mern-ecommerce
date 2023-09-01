module.exports = {
  //create user
  createUser(req) {
    const mongoose = require("mongoose");
    const userSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      role: String,
    });
    const User = mongoose.model("User", userSchema);
    var userCreated = {
      username: req.username,
      email: req.email,
      password: req.password,
      role: req.role,
    };
    User.create(userCreated);
    return userCreated;
    
  }
};
