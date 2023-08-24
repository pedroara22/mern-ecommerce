const express = require('express');
const initBe = require('./initBe');
const userSchema = require('./userSchema');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initBe.init();


app.get('/', (req, res) => {
    res.send("banana");
});

app.post('/createUser', function (req, res) {
    console.log(req.body);
    res.send();
});
app.listen(3333, () => {
    console.log('Server is running on port 3000');
});