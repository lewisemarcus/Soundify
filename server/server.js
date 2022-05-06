const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")
const { getMovieRouter, postMovieRouter, deleteMovie } = require("./routes")

const PORT = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(cors())

//mongoose connection
mongoose.connect(
    "mongodb+srv://lewisemarcus:root@cluster0.ejsvy.mongodb.net/moviesDB",
)

app.use("/", getMovieRouter)
app.use("/", postMovieRouter)
app.use("/", deleteMovie)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))
