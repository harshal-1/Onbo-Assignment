const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  climate: {
    type: String,
    required: [true, 'A record must have a climate'],
    enum: {
      values: ['hot', 'humid', 'rainy', 'cold'],
      message: 'Climate should be either: hot, humid, rainy or cold'
    }
  },
  area_code: {
    type: Number,
    required: [true, 'A record must have an area code'],
    min: [100, 'Area Code must be above 100'],
    max: [1000, 'Area Code must be below 1000'],
  },
  temperature: {
    type: Number,
    required: [true, 'A record must have a temperature'],
  },
  humidity: {
    type: Number,
    required: [true, 'A record must have a humidity'],
  },
  chances_of_rain: {
    type: Number,
    required: [true, 'A record must have chances of rain'],
  },
});

const Data = mongoose.model('Record', dataSchema)

module.exports = Data; 