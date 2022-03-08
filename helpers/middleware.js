const { beachSchema, reviewSchema } = require('../schemas.js');
const ExpressError = require('./ExpressError');
const Beach = require('../models/beach');


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

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be logged in.');
    return res.redirect('/users/login')
  }
  next();
}

const isOwner = async(req, res, next) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  if (!beach.owner.equals(req.user._id)) {
    req.flash('error', 'Permission denied.');
    return res.redirect(`/beaches/${id}`)
  }
  next();
}



module.exports = { isLoggedIn, isOwner, validateBeach, validateReview }