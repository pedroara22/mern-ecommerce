module.exports = (function () {
  var externalRoutes = require("express").Router();
  var multer = require("multer");
  var path = require("path");
  var fileDir = "";
  var storage = multer.diskStorage({
    destination: "books/",
    filename: function (req, file, cb) {
            var endName = path.extname(file.originalname);
            var baseName = path.basename(file.originalname, endName);
            var fileName = baseName + '-' + Date.now() + endName;
            fileDir = fileName;
            cb(null, fileName)
          }
        })
        var upload = multer({ storage: storage });
        
  externalRoutes.post("/createBook", upload.any(), async function (req, res) {

    var Book = require("../model/bookModel");

    var bookCreated = {
      name: req.body.name,
      description: req.body.description,
      cover: req.body.cover,
      pages: req.body.pages,
      dir: fileDir,
    };
    Book.create(bookCreated);
    res.send(bookCreated)


  });
  return externalRoutes;
})();
