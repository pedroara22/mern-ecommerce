module.exports = {
    //create shop
    createShop(req) {
        const mongoose = require("mongoose");
        const shopSchema = new mongoose.Schema({
            name: String,
            description: String,
            price: Number,
            image: String,
            category: String,
            products: Array,
            grade: Number
        });
        const Shop = mongoose.model("Shop", shopSchema);
        var shopCreated = {
            name: req.name,
            description: req.description,
            price: req.price,
            image: req.image,
            category: req.category,
            products: req.products,
            grade: null
        };
        Shop.create(shopCreated);
        return shopCreated;
    }
};
