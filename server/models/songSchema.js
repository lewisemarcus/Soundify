const mongoose = require("mongoose")

const songSchema = {
    title: String,
    genre: String,
    year: String,
    filename: String,
    link: String,
}

const Song = mongoose.model("Song", songSchema)

module.exports = Song
