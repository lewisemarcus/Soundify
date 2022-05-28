import pkg from "mongoose"
import textSearch from "mongoose-partial-full-search"
const { model, Schema } = pkg

const userSchema = new Schema({
    username: { type: String, required: true, default: null },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
        unique: true,
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
