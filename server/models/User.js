import pkg from "mongoose"
import textSearch from "mongoose-partial-full-search"
import dateFormat from "../utils/dateFormat.js"
const { model, Schema } = pkg

const userSchema = new Schema({
    username: { type: String, required: true, default: null },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
        unique: true,
    },
    uploaded: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    password: { type: String, required: true, minlength: 5 },
    token: { type: String },
    songs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Song",
        },
    ],
    playlists: [
        {
            type: Schema.Types.ObjectId,
            ref: "Playlist",
        },
    ],
})
userSchema.plugin(textSearch)
const User = model("User", userSchema, "users")

export default User
