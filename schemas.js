const Joi = require('joi');

const beachSchema = Joi.object({
  title: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  // image: Joi.string().required(),
});

const reviewSchema = Joi.object({
  rating: Joi.number().required(),
  body: Joi.string().required(),
});

module.exports = { beachSchema, reviewSchema };