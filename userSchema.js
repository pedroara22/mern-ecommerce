module.exports = {
  //create user
  createUser(req) {
    console.log(req)
    const mongoose = require("mongoose");
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
    });
    const User = mongoose.model("User", userSchema);
    const user = new User({
      name: "Pedro",
      email: "pedrin",
      password: "01329813",
    });
    user.save().then(() => console.log("User created"));
  },
};
