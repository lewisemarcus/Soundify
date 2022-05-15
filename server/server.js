import express from "express"
import dotenv from "dotenv"
import { getSongs, postSong, deleteSong } from "./routes/index.js"
import morgan from "morgan"
import { ApolloServer } from "apollo-server"
import mongoose from "mongoose"

import { default as typeDefs } from "./schema/typeDefs.js"
// const typeDefs = require("./graphql/typeDefs")
import { default as resolvers } from "./schema/resolvers/Users.js"
// const resolvers = require("./graphql/resolvers")

const MONGODB = "mongodb+srv://root:root@cluster0.cp13m.mongodb.net/SoundClone";
// const MONGODB = process.env.MONGO_URL

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const app = express()
dotenv.config()

const port = process.env.PORT || 4000

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
}
app.use(express.json())

app.use("/", getSongs)
app.use("/", postSong)
app.use("/", deleteSong)

mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB Connected")
        return server.listen(port)
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })
