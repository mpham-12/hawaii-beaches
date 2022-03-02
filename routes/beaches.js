const express = require("express");
const router = express.Router();
const Beach = require('../models/beach');


router.get('/', async (req, res) => {
  const beaches = await Beach.find({});
  res.render('beaches', { beaches })
})

router.get('/new', async (req, res) => {
  res.render('beaches_create')
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  res.render('beaches_show', { beach })
})

router.post('/', async (req, res) => {
  const beach = new Beach(req.body);
  await beach.save();
  res.redirect(`/beaches/${beach._id}`)
})


module.exports = router;