import User from "../models/User.js"
import Song from "../models/Songs.js"
import Playlist from "../models/Playlists.js"
import { ApolloError } from "apollo-server-errors"
import pkg from "bcryptjs"
const { hash, compare } = pkg
const secret = "UNSAFE_STRING"
import { default as jsonPkg } from "jsonwebtoken"
import { AuthenticationError } from "apollo-server-express"
const { sign } = jsonPkg

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            return User.findById(_id)
        },
        songById: async (parent, { _id }) => {
            return Song.findById(_id)
        },
        songByArtist: async (parent, { username }) => {
            const params = username ? { username } : {}
            return Song.find(params).sort({ uploaded: -1 })
        },
        songByGenre: async (parent, { genre }) => {
            const params = genre ? { genre } : {}
            return Song.find(params).sort({ uploaded: -1 })
        },

        users: async () => {
            return User.find().populate("songs")
        },
        songs: async () => {
            return Song.find()
        },
        song: async (parent, { title }) => {
            return Song.search(title, (err, output) => {
                if (err) return console.log(">>>>>ERR", err)
                return output.results
            })
        },
        playlist: async (parent, { plTitle }) => {
            return Playlist.findOne({ plTitle: plTitle })
        },
        userSongs: async (parent, { username }) => {
            const params = username ? { username } : {}
            return Song.find(params).sort({ uploaded: -1 })
        },
        userPlaylists: async (parent, { owner }) => {
            const params = owner ? { owner } : {}
            return Playlist.find(params).sort({ createdAt: -1 })
        },
        // userPlaylists: async (parent, args, context) => {
        //     if (context.user)
        //         return User.findOne({ _id: context.user._id })
        //             .populate("playlists")
        //             .sort({ createdAt: -1 })
        //     throw new AuthenticationError("You need to be logged in!")
        // },
    },
    Mutation: {
        registerUser: async (
            _,
            { registerInput: { username, email, password } },
        ) => {
            const oldUser = await User.findOne({ email })
            if (oldUser) {
                throw new ApolloError(
                    "A user is already registered with the email" + email,
                    "USER_ALREADY_EXISTS",
                )
            }

            let hashedPassword = await hash(password, 10)

            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: hashedPassword,
            })

            const token = sign(
                { payload: { user_id: newUser._id, email, username } },
                secret,
                {
                    expiresIn: "2h",
                },
            )
            newUser.token = token
            const res = await newUser.save()
            return {
                id: res.id,
                ...res._doc,
            }
        },
        loginUser: async (parent, { loginInput: { email, password } }) => {
            const user = await User.findOne({ email })
            const bool = user && (await compare(password, user.password))
            if (bool) {
                const payload = { user_id: user._id, email }
                const token = sign(
                    payload,
                    secret,
                    {
                        expiresIn: "2h",
                    },
                    function (err, token) {
                        if (err) console.error(err)
                        else console.log(token)
                    },
                )
                user.token = token
                return {
                    id: user.id,
                    ...user._doc,
                }
            } else {
                throw new ApolloError(
                    "Incorrect password",
                    "INCORRECT_PASSWORD",
                )
            }
        },
        addComment: async (parent, { songId, token, commentText }, context) => {
            if (context.user) {
                return Song.findOneAndUpdate(
                    { _id: songId },
                    {
                        $addToSet: {
                            comments: {
                                commentText,
                                commentAuthor: context.user.payload.username,
                            },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    },
                )
            }
            throw new AuthenticationError("You need to be logged in!")
        },
        removeComment: async (parent, { songId, commentId }, context) => {
            if (context.user) {
                return Song.findOneAndUpdate(
                    { _id: songId },
                    {
                        $pull: {
                            comments: {
                                _id: commentId,
                                commentAuthor: context.user.payload.username,
                            },
                        },
                    },
                    { new: true },
                )
            }
            throw new AuthenticationError("You need to be logged in!")
        },
    },
}

export default resolvers
