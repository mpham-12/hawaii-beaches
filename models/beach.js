const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const opts = { toJSON: { virtuals: true } };

const BeachSchema = new Schema({
  title: String,
  location: String,
  description: String,
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    }
  },
  image: {
    url: String,
    filename: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
}, opts);

BeachSchema.virtual('properties.popUpMarkup').get(function () {
  return `
  <strong><a style="color:orange; text-decoration:none; font-size: 16px" href="/beaches/${this._id}">${this.title}</a><strong>
`});

BeachSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})


module.exports = mongoose.model('Beach', BeachSchema);