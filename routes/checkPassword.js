module.exports = {
  checkPassword() {
    const userSchem = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      role: String,
    });
    const User = mongoose.model("User", userSchem);

    User.find({ username: req.body.username }).then((user) => {
      if (user) {
        if (user.password == req.body.password) {
          res.send("Password is correct");
        } else {
          res.send("Password is incorrect");
        }
      } else {
        res.send("User not found");
      }
    });
  },
};
