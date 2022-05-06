const express = require("express")
const router = express.Router()
const Movie = require("../../models/movieSchema")

router.route("/movies").get(async (req, res) => {
    const movieData = await Movie.find()

    res.json(movieData)
})

module.exports = router
