module.exports=(
    function(){

    var externalRoutes = require("express").Router();

    //Check if email is already in use
    
    externalRoutes.get("/cke", async function (req, res) {
        var User = require("../model/userModel");
        var EmailUsed;

        await User.find({ email: req.body.email }).then((user) => {
            EmailUsed = user;
            if (EmailUsed.length != 0) {
                res.status(401).send("Email already in use");
                return;
            }
        });

    });

    //Check if username is already in use

    externalRoutes.get("/cku", async function (req, res) {
        var User = require("../model/userModel");
        var UsernameUsed;

        await User.find({ username: req.body.username }).then((user) => {
            UsernameUsed = user;
            if (UsernameUsed.length != 0) {
                res.status(401).send("Username already in use");
                return;
            }
            else{
                res.send("Username is available");
            }
        });

    })

    return externalRoutes;

}
)();