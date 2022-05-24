import mongoose from "mongoose"
import dateFormat from "../utils/dateFormat.js"
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
            trim: true,
        },
        genre: {
            type: String,
            required: true,
            trim: true,
        },
        year: {
            type: String,
            required: true,
            trim: true,
        },
        filename: {
            type: String,
            required: true,
            trim: true,
        },
        link: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        uploaded: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        comments: [
            {
                commentText: {
                    type: String,
                    required: true,
                    minlength: 1,
                    maxlength: 280,
                },
                commentAuthor: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                    get: (timestamp) => dateFormat(timestamp),
                },
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
)

const Song = model("Song", songSchema, "songs")

export default Song
