const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeachSchema = new Schema({
  title: String,
  location: String,
  latitude: Number,
  longitude: Number,
  description: String,
  image: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
})

module.exports = mongoose.model('Beach', BeachSchema);