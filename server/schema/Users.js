import User from "../models/User.js"
import Song from "../models/Songs.js"
import Playlist from "../models/Playlists.js"
import { ApolloError } from "apollo-server-errors"
import pkg from "bcryptjs"
const { hash, compare } = pkg
// import { sign } from "jsonwebtoken"
import { default as jsonPkg } from "jsonwebtoken"
import { AuthenticationError } from "apollo-server-express"
const { sign } = jsonPkg

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            return User.findById(_id)
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
            return Song.findOne({ title: title })
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
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
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
        loginUser: async (_, { loginInput: { email, password } }) => {
            const user = await User.findOne({ email })
            console.log(user._id)
            if (user && (await compare(password, user.password))) {
                const token = sign(
                    { user_id: user._id, email },
                    "UNSAFE_STRING",
                    {
                        expiresIn: "2h",
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
        // addSong: async (
        //     parent,
        //     { songInput: { title, genre, filename, link, username, uploaded } },
        //     context,
        // ) => {
        //     if (context.user) {
        //         const song = await Song.create({
        //             title: title,
        //             genre: genre,
        //             filename: filename,
        //             username: context.user.username,
        //             link: link,
        //             uploaded: uploaded,
        //         })

        //         await User.findOneAndUpdate(
        //             { _id: context.user._id },
        //             { $addToSet: { songs: song._id } },
        //         )
        //     }
        // },
    },
}

export default resolvers

// export const resolvers = {
//   Mutation: {
//     registerUser: async (
//       _,
//       { registerInput: { username, email, password } }
//     ) => {
//       const oldUser = await findOne({ email });

//       if (oldUser) {
//         throw new ApolloError(
//           "A user is already registered with the email" + email,
//           "USER_ALREADY_EXISTS"
//         );
//       }

//       let hashedPassword = await hash(password, 10);

//       const newUser = new User({
//         username: username,
//         email: email.toLowerCase(),
//         password: hashedPassword,
//       });

//       const token = sign({ user_id: newUser._id, email }, "UNSAFE_STRING", {
//         expiresIn: "2h",
//       });

//       newUser.token = token;
//       const res = await newUser.save();
//       return {
//         id: res.id,
//         ...res._doc,
//       };
//     },
//     loginUser: async (_, { loginInput: { email, password } }) => {
//       const user = await findOne({ email });

//       if (user && (await compare(password, user.password))) {
//         const token = sign({ user_id: user._id, email }, "UNSAFE_STRING", {
//           expiresIn: "2h",
//         });
//         user.token = token;
//         return {
//           id: user.id,
//           ...user._doc,
//         };
//       } else {
//         throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD");
//       }
//     },
//   },
//   Query: {
//     user: (_, { ID }) => findById(ID),
//   },
// };
