const express = require("express");
const initBe = require("./initBe");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mainRoutes = require("./routes/UserRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initBe.init();

app.use('/r', mainRoutes)

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});