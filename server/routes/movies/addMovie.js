const express = require("express")
const router = express.Router()
const Movie = require("../../../models/movieSchema")

router.post("/newmovie", (req, res) => {
    console.log(req.body)
    const { title, genre, year } = req.body

    const newMovie = new Movie({
        title: title,
        genre: genre,
        year: year,
    })
    console.log(title, genre, year)
    newMovie.save()
})

module.exports = router
