const express = require("express");
const initBe = require("./initBe");
const bodyParser = require("body-parser");
const mainRoutes = require("./routes/UserRoutes");
const momentCheck = require("./routes/momentCheck");
const courseRoutes = require("./routes/CourseRoutes");
const BooksRoutes = require("./routes/BooksRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initBe.init();

app.use('/mc', momentCheck)
app.use('/r', mainRoutes)
app.use('/c', courseRoutes)
app.use('/b', BooksRoutes)



app.listen(3333, () => {
  console.log("Server is running on port 3333");
});