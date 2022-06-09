import User from "../models/User.js"
import Song from "../models/Songs.js"
import Playlist from "../models/Playlists.js"
import { ApolloError } from "apollo-server-errors"
import pkg from "bcryptjs"
import mongoose from "mongoose"
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
        allSongs: async () => {
            return Song.find()
        },
        song: async (parent, { title }) => {
            return Song.search(title, (err, output) => {
                if (err) return console.log(">>>>>ERR", err)
                return output.results
            })
        },
        playlist: async (parent, { _id }) => {
            return Playlist.findById(_id).populate("songs")
        },
        userSongs: async (parent, { username }) => {
            const params = username ? { username } : {}
            return Song.find(params).sort({ uploaded: -1 })
        },
        userPlaylists: async (parent, { owner }, context) => {
            const params = owner ? { owner } : {}
            if (context.user)
                return Playlist.find(params)
                    .populate("songs")
                    .sort({ createdAt: -1 })

            throw new AuthenticationError("You need to be logged in!")
        },
        // userPlaylists: async(parent, args, context) => {
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
                {
                    payload: {
                        user_id: newUser._id,
                        email: email,
                        username: username,
                    },
                },
                secret,
                {
                    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
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
                const payload = {
                    user_id: user._id,
                    email: email,
                    username: user.username,
                }
                const token = sign(payload, secret, {
                    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
                })
                user.token = token
                return { id: user._id, ...user._doc }
            } else {
                throw new ApolloError(
                    "Incorrect password",
                    "INCORRECT_PASSWORD",
                )
            }
        },
        addComment: async (
            parent,
            { songId, commentText, commentAuthor, token },
            context,
        ) => {
            if (context.user) {
                return Song.findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(songId) },
                    {
                        $addToSet: {
                            comments: {
                                commentText: commentText,
                                commentAuthor: commentAuthor,
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
        removeComment: async (
            parent,
            { songId, commentId, token, commentAuthor },
            context,
        ) => {
            console.log(context.user)
            if (context.user && context.user.username === commentAuthor) {
                return Song.findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(songId) },
                    {
                        $pull: {
                            comments: {
                                _id: mongoose.Types.ObjectId(commentId),
                            },
                        },
                    },
                    { new: true },
                )
            }
            throw new AuthenticationError("You need to be logged in!")
        },
        removeSong: async (parent, { songId, token }, context) => {
            if (context.user) {
                return Song.deleteOne({ _id: mongoose.Types.ObjectId(songId) })
            }
            throw new AuthenticationError("You need to be logged in!")
        },
        createPlaylist: async (parent, { playlistname, songId, username }) => {
            const newPlaylist = new Playlist({
                owner: username,
                plTitle: playlistname,
            })

            const pLs = await newPlaylist.save()

            return Playlist.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(pLs._id) },
                {
                    $addToSet: {
                        songs: songId,
                    },
                },
            )
        },
        addToPlaylist: async (parent, { _id, songId }, context) => {
            if (context.user) {
                return Playlist.findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(_id) },
                    {
                        $addToSet: {
                            songs: songId,
                        },
                    },
                )
            }
        },
        removeFromPlaylist: async (
            parent,
            { songId, playlistname, username },
        ) => {
            return Playlist.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(pLs._id) },
                {
                    $pull: {
                        songs: {
                            _id: mongoose.Types.ObjectId(songId),
                        },
                    },
                },
                { new: true },
            )
        },
    },
}

export default resolvers
