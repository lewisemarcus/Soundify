const mongoose = require("mongoose")

// const songSchema = {
//     title: String,
//     genre: String,
//     year: String,
//     filename: String,
//     link: String,
// }

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        genre: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        year: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        filename: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        link: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
)

const Song = mongoose.model("Song", songSchema, "songs")

module.exports = Song
