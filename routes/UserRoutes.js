module.exports = (
  function () {

    var externalRoutes = require("express").Router();

    externalRoutes.post("/createAccount", async function (req, res) {

      //Import CryptPassword function and User model
      var Crypt = require("../security/CryptPassword");

      var User = require("../model/userModel");

      //Check if username is already used

      var UsernameUsed;

      
      await User.find({ username: req.body.username }).then((user) => {
        UsernameUsed = user;
      });

      var EmailUsed;

      await User.find({ email: req.body.email }).then((user) => {
        EmailUsed = user;
      });

      if (UsernameUsed.length != 0 || EmailUsed.length != 0) {
        res.status(401).send("Username or Email already in use");
        return;
      } 
      else {
        //Crypt password and create user
        var CryptedPassword = await Crypt.cryptPassword(req.body.password);
        var userCreated = {
          username: req.body.username,
          email: req.body.email,
          password: CryptedPassword,
          cursos: [],
        };
        User.create(userCreated);
        res.send("User Created");
      }
  });

  externalRoutes.get("/checkPassword", function (req, res) {
    var User = require("../model/userModel");

    User.findOne({ username: req.body.username }).then(async (user) => {

      if (user) {

        user = user[0];

        var Crypt = require("../security/CryptPassword");

        var CryptedPassword = await Crypt.cryptPassword(req.body.password);

        if (CryptedPassword == user.password) {
          res.send("Password is correct");
        } 
        else {
          res.status(403).send("User or password incorrect");
        }
        }
        else {
          res.status(403).send("User or password incorrect");
        }

    });
  });

  externalRoutes.put("/buyCourse", async function (req, res) {

    //** Buy course */
    var User = require("../model/userModel");
    var Course = require("../model/courseModel");

    User.findOne({ username: req.body.username }).then(async (user) => {
      if(user){

        Course.findOne({ name: req.body.name }).then(async (course) => {
          if(course){
            user.courses.push(course.name);
            user.save();
            res.send("Course added with success");
          }
          else{
            res.status(401).send("Course not found");
          }
        });
    }
    else{
      res.status(401).send("User not found");
    }
  });


  })

  return externalRoutes;
})();
