const mongoose = require('mongoose');
const app = require('../app');

const thingSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  nanufacturer: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true }
});

module.exports = mongoose.model('Thing', thingSchema);