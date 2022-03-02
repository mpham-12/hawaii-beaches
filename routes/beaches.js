const express = require("express");
const router = express.Router();
const Beach = require('../models/beach');


router.get('/', async (req, res) => {
  const beaches = await Beach.find({});
  res.render('beaches', { beaches })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  res.render('beaches_show', { beach })
})


module.exports = router;