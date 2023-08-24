module.exports = {
    init() {
        const mongoose = require('mongoose');
        try{
            mongoose.connect('mongodb+srv://gameDevReact:pedroara22@cluster0.bissghl.mongodb.net/?retryWrites=true&w=majority',{
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        }
        catch(err){
            console.log(err);
        }
    }
}