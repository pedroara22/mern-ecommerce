var mongoose = require("mongoose");

const CourseModel = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    mainImage: String,
    images: Array,
    Books: Array,
    type: String,
    category: String,
});

module.exports = mongoose.model("Course", CourseModel);
