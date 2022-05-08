const express = require("express")
const router = express.Router()
const Song = require("../../models/songSchema")

router.route("/delete/:id").delete(async (req, res) => {
    const id = req.params.id

    Song.findByIdAndDelete({ _id: id }, function (err) {
        if (!err) console.log("Song deleted")
        else console.log("error: ", err)
    })
})

module.exports = router
