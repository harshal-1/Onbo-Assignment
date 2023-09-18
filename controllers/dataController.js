const Data = require('../models/dataModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Creating a Record
exports.createRecord = catchAsync(async (req, res, next) => {
  const record = await Data.create(req.body);
  res.status(201).json({
    success: 'true',
    error: null,
    data: {
      id: record._id
    },
  });
});

// Getting All Records
exports.getAllData = catchAsync(async (req, res, next) => {
  const data = await Data.find();
  // Checking for Data Existence
  if (data.length === 0) {
    next(new AppError('No Results Found', 400));
  } else {
    res.status(200).json({
      success: 'true',
      results: data.length,
      data: {
        data: data
      },
    });
  }
});

// Getting Records for a particular area code
exports.getAreaData = catchAsync(async (req, res, next) => {
  const data = await Data.find({ area_code: { $eq: req.params.area } });
  // Checking for Data Existence
  if (data.length === 0) {
    next(new AppError('No Results Found', 400));
  } else {
    res.status(201).json({
      success: 'true',
      results: data.length,
      data: {
        data: data,
      },
    });
  }
});

// Getting Records for a particular climate of a particular area code
exports.getAreaCLimateData = catchAsync(async (req, res, next) => {
  const data = await Data.find({
    area_code: { $eq: req.params.area },
    climate: { $eq: req.params.climate },
  });
  // Checking for Data Existence
  if (data.length === 0) {
    next(new AppError('No Results Found', 400));
  } else {
    res.status(201).json({
      success: 'true',
      results: data.length,
      data: {
        data: data,
      },
    });
  }
});

// Getting Formatted Data for a particular area code
exports.getFormattedData = catchAsync(async (req, res, next) => {
  const { from_climate, to_climate, area_code } = req.body;

  //Checking for climate validity
  if (from_climate === to_climate) {
    next(new AppError('from_climate and to_climate should not be same', 400));
  } else {
    const climate_delta = `${from_climate} -> ${to_climate}`;

    // Functions for calculating sum of Temperature, Humidity and Chances of Rain

    const tempSumFunction = (sum, data) => {
      return sum + data.temperature;
    };

    const humiditySumFunction = (sum, data) => {
      return sum + data.humidity;
    };

    const corSumFunction = (sum, data) => {
      return sum + data.chances_of_rain;
    };

    // Finding the data for mentioned climates of the given area
    const data_from = await Data.find({
      area_code: { $eq: area_code },
      climate: { $eq: from_climate },
    });
    const data_to = await Data.find({
      area_code: { $eq: area_code },
      climate: { $eq: to_climate },
    });

    // Checking for data existence
    if (data_from.length === 0 || data_to.length === 0) {
      next(new AppError('No Results Found', 400));
    } 
    
    // Calculating Required fields
    else {
      const noOfRecords = data_from.length + data_to.length;

      const from_temp = data_from.reduce(tempSumFunction, 0);
      const to_temp = data_to.reduce(tempSumFunction, 0);
      const td = (to_temp - from_temp) / noOfRecords;

      const from_hum = data_from.reduce(humiditySumFunction, 0);
      const to_hum = data_to.reduce(humiditySumFunction, 0);
      const hd = (to_hum - from_hum) / noOfRecords;

      const from_cor = data_from.reduce(corSumFunction, 0);
      const to_cor = data_to.reduce(corSumFunction, 0);
      const rd = (to_cor - from_cor) / noOfRecords;

      const cci = (td * hd) / rd;

      res.status(201).json({
        success: 'true',
        data: {
          climate_delta: climate_delta,
          temperature_delta: td,
          humidity_delta: hd,
          rain_chances_delta: rd,
          climate_change_index: cci,
        },
      });
    }
  }
});
