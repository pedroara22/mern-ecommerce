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

                if(!user){
                    res.status(401).send("User not found");
                    return;
                }

                if(!CourseSelected[0]){
                    res.status(401).send("Course not found");
                    return;
                }

                if(!user.courses[0]){
                    res.status(401).send("User has no courses");
                    return;
                }

                if (user.courses.includes(CourseSelected[0].name)) {
                    res.send("Access Granted");
                }

                else {
                    res.status(401).send("Access Denied");
                }
            });
        });

        externalRoutes.get("/getCourseList", async function (req, res) {

            var CourseList = [];

            if (req.body.filter == []) {

                await Course.find({}).then((course) => {
                    CourseList = course;
                });

            }
            else {
                if (req.body.filter = "price") {
                    await Course.find({}).then((course) => {
                        course.filter((course) => {
                            course.price <= req.body.price;
                        })
                    });
                }
                if (req.body.filter = "category") {
                    await Course.find({}).then((course) => {
                        course.filter((course) => {
                            course.category === req.body.category;
                        })
                    });
                }

            }

            res.send(CourseList);

        });
        externalRoutes.post("/addCourse", async function (req, res) {

            var token = req.body.token;

            if (await cryptPassword(token) != "2f98f03a3b1c72f4e135a98b2146785d") {
                res.status(403).send("Access Denied");
                return;
            }


            if(!req.body.name){
                res.status(401).send("Course must have a name");
                return
            }

            if(!req.body.price){
                res.status(401).send("Course must have a price");
                return
            }

            if(!req.body.mainImage){
                res.status(401).send("Course must have a main image")
                return
            }
            
            var nameUsed;

            await Course.find({name: req.body.name}).then((courseFound)=>{
                nameUsed = courseFound[0];
            })

            if(nameUsed){
                res.status(403).send("There is already a course with this name")
                return
            }

            var courseCreate = {
                name:req.body.name,
                description: req.body.description,
                price: req.body.price,
                mainImage: req.body.mainImage,
                images: req.body.images,
                books: req.body.books,
                type: req.body.type,
                category: req.body.category,
            }

            Course.create(courseCreate);

            res.send(courseCreate)



            
        });

        return externalRoutes;
    }
)();