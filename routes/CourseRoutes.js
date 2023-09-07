
module.exports = (
    function () {
        var externalRoutes = require("express").Router();
        const { cryptPassword } = require("../security/CryptPassword");
        var Course = require("../model/courseModel");
        var User = require("../model/userModel");

        externalRoutes.get("/getCourse", async function (req, res) {

            var CourseSelected;

            await Course.find({ name: req.body.name }).then((course) => {
                CourseSelected = course;
            });

            await User.find({ username: req.body.username }).then((user) => {

                user = user[0];

                if (user.cursos.includes(CourseSelected[0]._id)) {
                    res.send("Access Granted");
                }

                else {
                    res.status(401).send("Access Denied");
                }
            });
        });

        externalRoutes.get("/getCourseList", async function (req, res) {
                
                var CourseList = [];

                if(req.body.filter==[]){
    
                    await Course.find({}).then((course) => {
                        CourseList = course;
                    });

                }
                else{
                    if(req.body.filter = "price"){
                        await Course.find({}).then((course) => {
                            course.filter((course) => {
                                course.price<=req.body.price;
                            })
                        });
                    }
                    if(req.body.filter = "category"){
                        await Course.find({}).then((course) => {
                            course.filter((course) => {
                                course.category===req.body.category;
                            })
                        });
                    }

                }
    
                res.send(CourseList);
        
        });
        externalRoutes.post("/addCourse", async function (req, res) {

            var token = req.body.token;

            if(await cryptPassword(token)!="2f98f03a3b1c72f4e135a98b2146785d"){
                res.status(403).send("Access Denied");
                return;
            }
            else{
                res.send("Access Granted");
            }

        });

        return externalRoutes;
    }
)();