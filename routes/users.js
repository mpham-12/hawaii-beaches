const express = require("express");
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../helpers/catchAsync');
const passport = require('passport');


router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', catchAsync(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next(err)
      req.flash('success', 'Welcome!')
      res.redirect('/beaches')
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/users/register')
  }
}))

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/users/login' }), (async (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectTo = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}))

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'See you again!');
  res.redirect('/');
})

module.exports = router;