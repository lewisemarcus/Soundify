const express = require("express")
const router = express.Router()
const Movie = require("../../models/movieSchema")

router.route("/delete/:id").delete(async (req, res) => {
    const id = req.params.id

    Movie.findByIdAndDelete({ _id: id }, function (err) {
        if (!err) console.log("movie deleted")
        else console.log("error: ", err)
    })
})

module.exports = router
