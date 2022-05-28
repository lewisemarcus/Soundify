import mongoose from "mongoose"
import textSearch from "mongoose-partial-full-search"
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
            index: true,
        },
        genre: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        tags: [String],
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
songSchema.plugin(textSearch)
songSchema.index({ title: "text" })
songSchema.index({ username: "text" })
songSchema.index({ genre: "text" })
songSchema.index({ tags: "text" })

const Song = model("Song", songSchema, "songs")

export default Song
