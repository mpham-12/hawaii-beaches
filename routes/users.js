const express = require("express");
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../helpers/catchAsync');


router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', catchAsync(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.flash('success', 'Welcome!')
    console.log(registeredUser);
    res.redirect('/beaches')
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/users/register')
  }
}))

module.exports = router;