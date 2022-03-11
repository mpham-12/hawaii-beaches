const Beach = require('../models/beach');
const Review = require('../models/review');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapboxToken});

const index = async (req, res) => {
  const beaches = await Beach.find({});
  res.render('beaches', { beaches })
}


const newForm = (req, res) => {
  res.render('beaches_create')
}

const postBeach = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
    query: `${req.body.title}, ${req.body.location}`,
    limit: 5
  }).send()
  const beach = new Beach(req.body);
  beach.geometry = geoData.body.features[0].geometry;
  beach.image = { url: req.file.path, filename: req.file.filename };
  beach.owner = req.user._id;
  await beach.save();
  console.log(beach, 'beach')
  req.flash('success', 'Success! You have listed a new beach.');
  res.redirect(`/beaches/${beach._id}`)
}

const showBeach = async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id).populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  }).populate('owner');
  console.log(beach)
  if (!beach) {
    req.flash('error', "The beach you're looking for does not exist.");
    return res.redirect('/beaches')
  }
  res.render('beaches_show', { beach, msg: req.flash('success') })
}

const updateForm = async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  if (!beach) {
    req.flash('error', "The beach you're looking for does not exist.");
    return res.redirect('/beaches')
  }
  res.render('beaches_update', { beach });
}

const updateBeach = async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findByIdAndUpdate(id, { ...req.body });
  beach.image = { url: req.file.path, filename: req.file.filename };
  await beach.save();
  req.flash('success', 'Success! You have modified the beach.');
  res.redirect(`/beaches/${id}`)
}

const deleteBeach = async (req, res) => {
  const { id } = req.params;
  await Beach.findByIdAndDelete(id);
  req.flash('success', 'Your listed beach has been deleted.');
  res.redirect(`/beaches/`);
}

const postReview = async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  const review = new Review(req.body);
  review.author = req.user._id;
  beach.reviews.push(review);
  await review.save();
  await beach.save();
  req.flash('success', 'Success! Your review has been posted.');
  res.redirect(`/beaches/${id}`);
}

const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Beach.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Your review has been deleted.');
  res.redirect(`/beaches/${id}`);
}

const showReview = async (req, res) => {
  const { id } = req.params;
  await Beach.findById(id);
  res.redirect(`/beaches/${id}`);
}


module.exports = { index, newForm, postBeach, showBeach, updateForm, updateBeach, deleteBeach, postReview, deleteReview, showReview };