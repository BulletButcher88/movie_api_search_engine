const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: false
    },
    Plot: {
      type: String,
      required: false
    },
    Year: {
      type: Number,
      required: false
    },
    Director: {
      type: String,
      required: false
    },
    Poster: {
      type: String,
      required: false
    },
    imdbRating: {
      type: String,
      required: false
    },
    imdbID: {
      type: String,
      required: false
    },
  },
  { collection: "movie" }
);

module.exports = mongoose.model("movie", movieSchema);

