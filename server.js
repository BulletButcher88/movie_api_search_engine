// movie app
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000
const axios = require('axios');
const cors = require('cors')

const Movie = require('./models/movie')

require('dotenv').config()
const APIKEY = process.env.MOVIE_KEY_ROB
const imdb = require('imdb-api');
const mongoURIENVPROD = process.env.MONGO_URI;


mongoose.connect(
  mongoURIENVPROD,
  { useNewUrlParser: true },
  err => {
    if (err) return console.log(`${err}`);
    console.log("connected to mongo atlas");
  }
);


app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => {
// imdb.get({name: 'The Toxic Avenger'}, {apiKey: APIKEY, timeout: 30000})
// .then(movie => {
//   return res.json(movie);
// })
// .then(console.log)
// .catch(console.log);
// })

app.get('/movie/all', (req,res) => {
  Movie.find({})
  .then(allMovies => {
    console.log(allMovies);
    return res.json(allMovies);
  })
  .catch(err => res.json(err));

})


app.get('/movie/:name', (req, res) => {
  console.log(req.params)
  const { name } = req.params;
  
  imdb.get({name: name }, {apiKey: APIKEY, timeout: 3000})
  .then(movie => {
    return res.json(movie);
  })
  .catch(console.log);
  })

app.post('/movie/add', (req,res)=>{
  // req.body returns an object
  console.log(req.body)
  const { Title, Plot, Year, Director, Poster, imdbRating, imdbID } = req.body;


  Movie.create({ Title, Plot, Year, Director, Poster, imdbRating, imdbID, })
    .then(newMovie => {
      res.json(newMovie);
    })
    .catch(err => res.json(err));
})

app.delete('/movie/remove/:id', (req, res) => {
  const { id } = req.params;
  console.log(id)
  Movie.deleteOne({ imdbID: id })
    .then(doc => {
  if (!doc) return res.send(`No movie found at id ${id}`);
    res.send(`${doc.name} deleted from database`);
      })
    .catch(err => res.json(err));
    }
)


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})