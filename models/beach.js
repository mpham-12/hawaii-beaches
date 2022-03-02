const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeachSchema = new Schema({
  title: String,
  // rating: Number,
  description: String,
  location: String,
  latitude: Number,
  longitude: Number,
  // image:
})

module.exports = mongoose.model('Beach', BeachSchema);