var mongoose = require("mongoose");

const BookModel = new mongoose.Schema({
    name: String,
    description: String,
    cover: String,
    pages: Number,
    dir: String
});

module.exports = mongoose.model("Book", BookModel);