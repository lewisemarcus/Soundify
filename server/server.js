const express = require("express")
const app = express()
require("dotenv").config()

const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")
const { getSongs, postSong, deleteSong } = require("./routes")

const PORT = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(cors())

//mongoose connection
mongoose.connect(
    "mongodb+srv://lewisemarcus:root@cluster0.ejsvy.mongodb.net/musicDB",
)

app.use("/", getSongs)
app.use("/", postSong)
app.use("/", deleteSong)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client", "build")))
    app.get("*", (req, res) => {
        res.sendFile(
            path.join(__dirname, "..", "client", "build", "index.html"),
        )
    })
}

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))
