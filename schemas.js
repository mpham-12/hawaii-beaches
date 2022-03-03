const Joi = require('joi');

const beachSchema = Joi.object({
  title: Joi.string().required(),
  location: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
});

module.exports = {beachSchema};