const express = require("express");
const router = express.Router();
const Beach = require('../models/beach');
const catchAsync = require('../helpers/catchAsync');
const ExpressError = require('../helpers/ExpressError');
const { beachSchema, reviewSchema } = require('../schemas.js');
const Review = require('../models/review');
const {isLoggedIn} = require('../helpers/middleware');


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
router.get('/new', isLoggedIn, (req, res) => {

  res.render('beaches_create')
})

router.post('/', validateBeach, isLoggedIn, catchAsync(async (req, res) => {
  const beach = new Beach(req.body);
  await beach.save();
  req.flash('success', 'Success! You have listed a new beach.');
  res.redirect(`/beaches/${beach._id}`)
}))

//show
router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id).populate('reviews');
  if (!beach) {
    req.flash('error', "The beach you're looking for does not exist.");
    return res.redirect('/beaches')
  }
  res.render('beaches_show', { beach, msg: req.flash('success') })
}))

//update
router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  if (!beach) {
    req.flash('error', "The beach you're looking for does not exist.");
    return res.redirect('/beaches')
  }
  res.render('beaches_update', { beach });
}))

router.put('/:id', validateBeach, isLoggedIn, catchAsync(async (req, res) => {
  const { id } = req.params;
  await Beach.findByIdAndUpdate(id, { ...req.body });
  req.flash('success', 'Success! You have modified the beach.');
  res.redirect(`/beaches/${id}`)
}))

//delete
router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
  const { id } = req.params;
  await Beach.findByIdAndDelete(id);
  req.flash('success', 'Your listed beach has been deleted.');
  res.redirect(`/beaches/`);
}))

//post review
router.post('/:id/reviews', isLoggedIn, validateReview, catchAsync(async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  const review = new Review(req.body);
  beach.reviews.push(review);
  await review.save();
  await beach.save();
  req.flash('success', 'Success! Your review has been posted.');
  res.redirect(`/beaches/${id}`);
}))

//delete review
router.delete('/:id/reviews/:reviewId', isLoggedIn, catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Beach.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Your review has been deleted.');
  res.redirect(`/beaches/${id}`);
}))


module.exports = router;