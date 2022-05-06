const getMovieRouter = require("./movies/getMovies")

const postMovieRouter = require("./movies/addMovie")

const deleteMovie = require("./movies/deleteMovie")

module.exports = { getMovieRouter, postMovieRouter, deleteMovie }
