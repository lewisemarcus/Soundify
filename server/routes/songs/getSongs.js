import { Router } from "express"
import Song from "../../models/Songs.js"
const router = Router()

router.route("/songs").get(async (req, res) => {
    const songData = await Song.find().sort({ uploaded: -1 })

    res.json(songData)
})

export { router }
