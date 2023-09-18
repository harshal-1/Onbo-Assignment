const express = require('express');
const dataController = require('../controllers/dataController');
const router = express.Router();

// Routes for Creating a Record and Getting All Records
router
  .route('/')
  .get(dataController.getAllData)
  .post(dataController.createRecord);

// Routes for Getting Special Data i.e. Data in Formatted Form
router.route('/getFormattedData').get(dataController.getFormattedData);

// Routes for Getting Data for a particular area and for particular climate of a particular area
router.route('/:area').get(dataController.getAreaData);
router.route('/:area/:climate').get(dataController.getAreaCLimateData);


module.exports = router;
