const express = require("express");
const initBe = require("./initBe");
const userSchema = require("./schemas/userSchema");
const bodyParser = require("body-parser");
const shopSchema = require("./schemas/shopSchema");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initBe.init();

app.get("/checkPassword", (req, res) => {
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
});

app.post("/createUser", function (req, res) {
  userSchema.createUser(req.body);
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});

app.post("/createShop", function (req, res) {
  shopSchema.createShop(req.body);
});
