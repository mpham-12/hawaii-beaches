const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeachSchema = new Schema({
  title: String,
  // rating: Number,
  location: String,
  latitude: Number,
  longitude: Number,
  description: String,
  // image:
})

module.exports = mongoose.model('Beach', BeachSchema);