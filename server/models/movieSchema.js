const mongoose = require("mongoose")

const movieSchema = {
    title: String,
    genre: String,
    year: String,
}

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie
