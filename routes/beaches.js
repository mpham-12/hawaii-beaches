const express = require("express");
const router = express.Router();
const Beach = require('../models/beach');

//index
router.get('/', async (req, res) => {
  const beaches = await Beach.find({});
  res.render('beaches', { beaches })
})

//create
router.get('/new', async (req, res) => {
  res.render('beaches_create')
})

router.post('/', async (req, res) => {
  const beach = new Beach(req.body);
  await beach.save();
  res.redirect(`/beaches/${beach._id}`)
})

//show
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  console.log(beach);
  res.render('beaches_show', { beach })
})

//update
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const beach = await Beach.findById(id);
  res.render('beaches_update', { beach });
})

router.put('/:id', async (req, res)=>{
  const { id } = req.params;
  await Beach.findByIdAndUpdate(id, {...req.body});
  res.redirect(`/beaches/${id}`)
})

//delete
router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  await Beach.findByIdAndDelete(id);
  res.redirect(`/beaches/`)
})

module.exports = router;