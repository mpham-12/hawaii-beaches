const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeachSchema = new Schema({
  title: String,
  // rating: Number,
  description: String,
  location: String,
  longitude: Number,
  latitude: Number,
  // image:
})