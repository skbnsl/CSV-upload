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
app.listen(port, function(e){
          if(e){console.log('error in server running',e); return;}

          console.log(`server is running on port ${port}`);
});