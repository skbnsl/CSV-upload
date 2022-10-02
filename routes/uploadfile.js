

const express = require('express');
//import the fileController from controllers
const FileController = require('../controllers/file_controller');

const router = express.Router();

//for upload the csv file
router.post('/upload', FileController.upload);

//for open the csv file
router.get('/open', FileController.open);

//for deleting the csv file
router.get('/delete', FileController.delete);

module.exports = router;