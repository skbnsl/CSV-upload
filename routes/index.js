

//import express
const express = require('express');

//import homeController from controllers
const homeController = require('../controllers/home_controller');

const router = express.Router();

//route for home page
router.get('/', homeController.home);

//route for using upload, open and delete the file
router.use('/uploadfile', require('./uploadfile'));

//export the router
module.exports = router;