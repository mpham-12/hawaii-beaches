if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const ExpressError = require('./helpers/ExpressError');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require("connect-mongo")(session);
const dbUrl= process.env.DB_URL || 'mongodb://localhost:27017/hawaii-beaches';
// const dbUrl= 'mongodb://localhost:27017/hawaii-beaches';



mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch((err) => {
    console.log(err)
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware, functions that run each time a request is sent
app.use(express.urlencoded({ extended: true })) //allows req.body to be parsed
app.use(methodOverride('_method')); //allows use of PUT/PATCH/DELETE
app.use(morgan('dev'));
app.use(cookieParser('secretcode'));

const secret=process.env.SECRET || 'reallylongpassword';

const store = new MongoStore({
  url: dbUrl,
  secret: secret,
  touchAfter:24*60*60,
})

store.on("error", function(){
  console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
  store,
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(mongoSanitize({
  replaceWith: '_'
}));
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())//store user in the session
passport.deserializeUser(User.deserializeUser())//remove user from session

//gives every file access to these variables
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})



//import routers
const homepageRouter = require('./routes/homepage.js');
const beachesRouter = require('./routes/beaches.js');
const usersRouter = require('./routes/users.js');


//pass routers to express as middleware
app.use('/', homepageRouter);
app.use('/beaches', beachesRouter);
app.use('/users', usersRouter);


//error handling for all other pages
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

//custom error-handling middleware function. 
//overthrows express' default error handling 
//next(err) passes to here
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).render('error', { err });
})

const port= process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`SERVING ON PORT ${port}`)
})