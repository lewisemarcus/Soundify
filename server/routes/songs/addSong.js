//Add song

import { Router } from "express"
const router = Router()
import multer from "multer"
import { memoryStorage } from "multer"
import dotenv from "dotenv"
dotenv.config()
import { uploadSong, uploadImage } from "../../S3Service/index.js"

const storage = memoryStorage()
const upload = multer({ storage: storage })

router.post(
    "/upload",
    upload.fields([
        { name: "filename", maxCount: 1 },
        { name: "imgFilename", maxCount: 1 },
    ]),
    async (req, res) => {
        const { title, genre, username, tags, artist } = req.body
        const fName = tags.toString() + username
        const content = {
            filename: fName,
            bucketname: "soundclone-music",
            file: req.files["filename"][0].buffer,
        }
        console.log(req.files["imgFilename"][0])
        if (req.files["imgFilename"] !== undefined) {
            const imageContent = {
                filename: fName + req.files["imgFilename"][0].originalname,
                bucketname: "soundclone-music",
                file: req.files["imgFilename"][0].buffer,
            }
            await uploadImage(imageContent)
        }

        const newSong = {
            title: title,
            tags: tags,
            genre: genre,
            artist: artist,
            username: username,
            filename: fName,
        }

        await uploadSong(content, newSong)

        res.redirect("/")
    },
)

export { router }
