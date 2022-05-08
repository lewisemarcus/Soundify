const { Schema, model } = require("mongoose")

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Must match an email address!"],
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
)

const User = model("User", userSchema, "users")

module.exports = User
