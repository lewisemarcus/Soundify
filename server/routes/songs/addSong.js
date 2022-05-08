const express = require("express")
const router = express.Router()
const multer = require("multer")
const { memoryStorage } = require("multer")
require("dotenv").config()

const uploadSong = require("../../S3Service")
const storage = memoryStorage()
const upload = multer({ storage: storage })

router.post("/newsong", upload.single("filename"), async (req, res) => {
    const { originalname } = req.file
    const { title, genre, year } = req.body
    const content = {
        filename: title,
        bucketname: "soundclone-music",
        file: req.file.buffer,
    }

    const newSong = {
        title: title,
        genre: genre,
        year: year,
        filename: originalname,
        link: "",
    }
    await uploadSong(content, newSong)

    res.redirect("/")
})

module.exports = router
