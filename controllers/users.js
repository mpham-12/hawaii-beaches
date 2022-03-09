const User = require('../models/user');

const registerForm = (req, res) => {
  res.render('register')
}

const registerUser = async (req, res) => {
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
}

const loginForm = (req, res) => {
  res.render('login')
}

const loginUser = async (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectTo = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
}

const logoutUser = (req, res) => {
  req.logout();
  req.flash('success', 'See you again!');
  res.redirect('/');
}



module.exports = { registerForm, registerUser, loginForm, loginUser, logoutUser }