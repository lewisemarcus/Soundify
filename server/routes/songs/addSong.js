import { Router } from "express"
const router = Router()
import multer from "multer"
import { memoryStorage } from "multer"
import dotenv from "dotenv"
dotenv.config()
import uploadSong from "../../S3Service/index.js"

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

export { router }
