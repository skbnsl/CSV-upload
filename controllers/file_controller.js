//using path and fs module
const path = require('path');
const fs = require('fs');

//import csv-parser
const csv = require('csv-parser');

//import multer for uploading file
const multer = require('multer');
//creating Array of upload files
const Files = [];

//where we store the uploads file
const storage = multer.diskStorage({ destination: function(req, file, callback){
          callback(null, path.join( __dirname ,'../uploads'));          
}, 
   filename : function(req, file, callback){
          const suffix = Date.now() + '-' + Math.round(Math.random()*1E9);
          callback(null, file.originalname + '-' + suffix);
   }
});


//function that we can upload only csv files
function fileFilter(req, file, callback){
     if(file.mimetype == 'text/csv'){
          //if file type is csv
          callback(null, true);
     } else {
          //if filetype is not csv format
          callback(null, false);
     }
}

const upload = multer({storage: storage, fileFilter:fileFilter}).single('upload_file');

//for upload the csv file
module.exports.upload = function(req, res){
          upload(req, res, function(error){
              if(error instanceof multer.MulterError){
                    console.log('error in multer', error);
                    return;
              } else if(error){
                    console.log('multer error', error);
                    return;
              } else if(req.file){
                    Files.push(req.file.filename);
              }
              return res.redirect('back');
          });
}

module.exports.Files = function(){
          return Files;
}

//for open the csv file in table form
module.exports.open = function(req, res){
          const csvParsed = [];
           const index = req.query.index;
          fs.createReadStream(path.join(__dirname, '../','/uploads', Files[index]))
            .pipe(csv())
            .on('data', (data) => csvParsed.push(data))
             .on('end', () => {
                    return res.render('table_form', {
                    csvData : csvParsed 
             });
            });
}

//for delete the csv file
module.exports.delete = function(req, res){
      try {
           let index = req.query.index;
           let files = fs.readdirSync(path.join(__dirname,'../','/uploads'));
           if(files.length > 0){
            let filePath = path.join(__dirname,'../','/uploads', Files[index]);
            if(fs.statSync(filePath).isFile()){
                  fs.unlinkSync(filePath);
            }
            Files.splice(index,1);
            return res.redirect('back');

           }
            

      } catch (error) {
            if(error){
                  console.log('error in delete', error);
                  return;
            }
      }

}




