import pkg from "mongoose"
const { model, Schema } = pkg

const playlistSchema = new Schema(
    {
        title: {
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

const Playlist = model("Playlist", songSchema, "playlists")

export default Playlist
