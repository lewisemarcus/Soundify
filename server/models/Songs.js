import mongoose from "mongoose"
const { Schema, model } = mongoose

// const songSchema = {
//     title: String,
//     genre: String,
//     year: String,
//     filename: String,
//     link: String,
// }

const songSchema = new Schema(
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

const Song = model("Song", songSchema, "songs")

export default Song
