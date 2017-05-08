const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000; // required for heroku deployment

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFileSync('server.log', log + '\n');
  console.log(log);
  next();
})
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

app.get('/', (req, res)=>{
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeText: 'Hello and welcome to our site',
    name: 'Talal',
    likes: [
      'hockey',
      'code'
      ]
  })
});

app.get('/about', (req,res) =>{
  res.render('about.hbs', {
    pageTitle:'About Page',
  })
})

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Error processing request'
  })
})

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
