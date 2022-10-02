//import FileController
const FileController = require('./file_controller');

//using files from FileController
const Files = FileController.Files;
const arr = Files();

//Home page
module.exports.home = function(req, res){
          return res.render('home', {
                    files : arr
          });
}