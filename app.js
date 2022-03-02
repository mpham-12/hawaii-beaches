const express = require('express');
const app = express();
const path= require('path')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));





//example route
app.get('/', (req, res)=>{
  res.render('home')
})


app.listen(8080, ()=>{
  console.log('SERVING ON PORT 8080')
})