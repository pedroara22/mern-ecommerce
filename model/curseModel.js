var mongoose = require("mongoose");

const CurseModel = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    mainImage: String,
    images: Array,
    Books: Array
});

module.exports = mongoose.model("Curse", CurseModel);
