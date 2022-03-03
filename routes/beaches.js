const express = require("express");
const router = express.Router();
const Beach = require('../models/beach');
const catchAsync = require('../helpers/catchAsync');
const ExpressError = require('../helpers/ExpressError');
const Joi = require('joi');


//index
router.get('/', catchAsync(async (req, res) => {
  const beaches = await Beach.find({});
  res.render('beaches', { beaches })
}))

//create
router.get('/new', catchAsync(async (req, res) => {
  res.render('beaches_create')
}))

router.post('/', catchAsync(async (req, res) => {
  // if (!req.body) throw new ExpressError('Invalid Beach Data', 400)
  const beachSchema = Joi.object({
      title: Joi.string().required(),
      location: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
    })

  const {error} = beachSchema.validate(req.body);
  if (error){
    const msg = error.details.map(e => e.message).join(',')
    throw new ExpressError(msg, 400)
  }
  const beach = new Beach(req.body);
  await beach.save();
  res.redirect(`/beaches/${beach._id}`)
}))

//show
router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  console.log('beach show', beach);
  res.render('beaches_show', { beach })
}))

//update
router.get('/:id/edit', catchAsync(async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  res.render('beaches_update', { beach });
}))

router.put('/:id', catchAsync(async (req, res) => {
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

module.exports = router;