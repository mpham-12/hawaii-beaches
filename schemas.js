const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
      'string.escapeHTML': '{{#label}} must not include HTML!'
  },
  rules: {
      escapeHTML: {
          validate(value, helpers) {
              const clean = sanitizeHtml(value, {
                  allowedTags: [],
                  allowedAttributes: {},
              });
              if (clean !== value) return helpers.error('string.escapeHTML', { value })
              return clean;
          }
      }
  }
});

const Joi = BaseJoi.extend(extension)

const beachSchema = Joi.object({
  title: Joi.string().required().escapeHTML(),
  location: Joi.string().required().escapeHTML(),
  description: Joi.string().required().escapeHTML(),
  // image: Joi.string().required(),
});

const reviewSchema = Joi.object({
  rating: Joi.number().required(),
  body: Joi.string().required().escapeHTML(),
});

module.exports = { beachSchema, reviewSchema };