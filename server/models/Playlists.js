import dateFormat from "../utils/dateFormat.js"

import textSearch from "mongoose-partial-full-search"
import pkg from "mongoose"
const { model, Schema } = pkg

const playlistSchema = new Schema(
    {
        plTitle: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        owner: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        songs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Song",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
)
playlistSchema.plugin(textSearch)
const Playlist = model("Playlist", playlistSchema, "playlists")

export default Playlist
