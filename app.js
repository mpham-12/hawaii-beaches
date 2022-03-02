const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');

mongoose.connect('mongodb://localhost:27017/hawaii-beaches', {
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



//import routers
const homepageRouter = require('./routes/homepage.js');
const beachesRouter = require('./routes/beaches.js');


//pass routers to express as middleware
app.use('/', homepageRouter);
app.use('/beaches', beachesRouter);

//404 page
app.use((req, res) => {
  res.status(404).send('page not found');
})

app.listen(8080, () => {
  console.log('SERVING ON PORT 8080')
})