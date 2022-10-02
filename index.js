//using express
const express = require('express');
const port = process.env.PORT || 4000;
//use path and fs(file system)
const path = require('path');
const fs = require('fs');

//directory path
var __dirname = path.resolve();

//initialize express
const app = express();

//setting the view engine template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({extended: true})); 

app.use('/uploads', express.static(__dirname +'/uploads'));

//for routes 
app.use('/', require('./routes/index'));

//check server
app.listen(port, function(err){
          if(err){console.log('error in server running',e); return;}
          //delete the uploaded file after restarting the server
          try {
                    let files = fs.readdirsync(path.join(__dirname,'/uploads'));
                    if(files.length >  0){
                              for(let i=0; i<files.length; i++){
                                        var filePath = path.join(__dirname, '/uploads',files[i]);
                                        if(fs.statSync(filePath).isFile()){
                                                  fs.unlinkSync(filePath);
                                        }
                              }
                    }
          } catch (error) {
                    if(error){
                              return;
                    }
          }

          console.log(`server is running on port ${port}`);
});