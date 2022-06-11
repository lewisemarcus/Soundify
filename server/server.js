import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import { getSongs, postSong, deleteSong } from "./routes/index.js"
import morgan from "morgan"
import { authMiddleware } from "./utils/auth.js"
import { ApolloServer } from "apollo-server-express"
import mongoose from "mongoose"
import * as path from "path"
import bodyParser from "body-parser"
import { fileURLToPath } from "url"
import resolvers from "./schema/resolvers.js"
import typeDefs from "./schema/typeDefs.js"
import * as fs from "fs"
import * as https from "https"
dotenv.config()
const MONGODB = process.env.MONGO_URL

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
})
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = express()
server.applyMiddleware({ app })

const port = process.env.PORT || 4000

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
}
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser({ limit: "50mb" }))
app.use(cors())
app.use(express.json())

app.use("/", getSongs)
app.use("/", postSong)
app.use("/", deleteSong)

mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB Connected")
        return app.listen(port)
    })
    .then((res) => {
        console.log(`Server running`)
    })
if (process.env.NODE_ENV === "production") {
    // const privateKey = fs.readFileSync(process.env.PRIVATEKEY, "utf8")
    // const certificate = fs.readFileSync(process.env.CERT, "utf8")

    // const credentials = {
    //     key: privateKey,
    //     cert: certificate,
    // }
    // https.createServer(credentials, app).listen(443, () => {
    //     console.log("HTTPS Server running on port 443")
    // })
    // https
    //     .createServer(function (req, res) {
    //         res.writeHead(301, {
    //             Location: "https://" + req.headers["host"] + req.url,
    //         })
    //         res.end()
    //     })
    //     .listen(80)
    app.use(express.static(path.join(__dirname, "..", "client", "build")))
    app.get("*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "client", "build", "index.html"),
        )
    })
}
