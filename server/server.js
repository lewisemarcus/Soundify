import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connect.js"
import { getSongs, postSong, deleteSong, userAuth } from "./routes/index.js"
import jobsRoutes from "./routes/jobsRoutes.js"
import "express-async-errors"
import morgan from "morgan"

//middleware imports
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"

const app = express()
dotenv.config()
const port = process.env.PORT || 4000

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
}
app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome")
})

app.use("/", getSongs)
app.use("/", postSong)
app.use("/", deleteSong)

app.use("/api/v1/auth", userAuth)
app.use("/api/v1/jobs", jobsRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        // await connectDB(process.env.MONGO_URL)
        await connectDB("mongodb+srv://root:root@cluster0.cp13m.mongodb.net/SoundClone")
        app.listen(port, () => {
            console.log(`Running on port ${port}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()
