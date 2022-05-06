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

//api routes
app.get("/", (req, res) => {
    res.send("express is here")
})
app.use("/", getMovieRouter)
app.use("/", postMovieRouter)
app.use("/", deleteMovie)

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))
