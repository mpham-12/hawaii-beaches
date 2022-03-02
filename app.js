const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const Beach = require('./models/beach');

mongoose.connect('mongodb://localhost:27017/hawaii-beaches', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB...')
  })
  .catch((err) => {
    console.log(err)
  });
  
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Database connected');
// });


//import routers
const homepageRouter = require('./routes/homepage.js');


//pass routers to express as middleware
app.use('/', homepageRouter);



app.listen(8080, () => {
  console.log('SERVING ON PORT 8080')
})