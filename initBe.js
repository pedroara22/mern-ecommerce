module.exports = {
    init() {
        const mongoose = require('mongoose');
        require('dotenv').config();
        try{
            mongoose.connect(process.env.MONGO_KEY,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        }
        catch(err){
            console.log(err);
        }
    }
}