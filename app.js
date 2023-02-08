const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/public`))

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index',{
    navbar:true,
    title: "Home",
    footer:true
  });
});


app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    res.render('beers', {
      beers:beersFromApi,
      navbar:true,
      title:"Beers",
      footer:true
    });
  })
  .catch(error => {
    console.log(error)
  })

  
});

// app.get('/beers/beer-:beerId', (req, res) => {
//   let id = req.params;
//   console.log("id")

// }) 


app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(randomBeer => {
      res.render('random-beer',{
        random:randomBeer,
        navbar:true,
        title:"Random beer",
        footer:true
      });
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port http://localhost:3000'));
