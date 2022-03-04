const express = require("express");
const router = express.Router();
const Beach = require('../models/beach');
const catchAsync = require('../helpers/catchAsync');
const ExpressError = require('../helpers/ExpressError');
const { beachSchema, reviewSchema } = require('../schemas.js');
const Review = require('../models/review')


const validateBeach = (req, res, next) => {
  const { error } = beachSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(e => e.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(e => e.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}


//index
router.get('/', catchAsync(async (req, res) => {
  const beaches = await Beach.find({});
  res.render('beaches', { beaches })
}))

//create
router.get('/new', catchAsync(async (req, res) => {
  res.render('beaches_create')
}))

router.post('/', validateBeach, catchAsync(async (req, res) => {
  const beach = new Beach(req.body);
  await beach.save();
  res.redirect(`/beaches/${beach._id}`)
}))

//show
router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id).populate('reviews');
  res.render('beaches_show', { beach })
}))

//update
router.get('/:id/edit', catchAsync(async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  res.render('beaches_update', { beach });
}))

router.put('/:id', validateBeach, catchAsync(async (req, res) => {
  const { id } = req.params;
  await Beach.findByIdAndUpdate(id, { ...req.body });
  res.redirect(`/beaches/${id}`)
}))

//delete
router.delete('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  await Beach.findByIdAndDelete(id);
  res.redirect(`/beaches/`)
}))

//post review
router.post('/:id/reviews', validateReview, catchAsync(async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  const review = new Review(req.body);
  beach.reviews.push(review);
  await review.save();
  await beach.save();
  console.log(beach.reviews)
  res.redirect(`/beaches/${id}`);
}))

//delete review
router.delete('/:id/reviews/:reviewId', catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Beach.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/beaches/${id}`);
}))


module.exports = router;