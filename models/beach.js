const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')

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

BeachSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
      await Review.deleteMany({
          _id: {
              $in: doc.reviews
          }
      })
  }
})

module.exports = mongoose.model('Beach', BeachSchema);