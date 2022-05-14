import { Router } from "express"
const router = Router()
import Song from "../../models/Songs.js"

router.route("/delete/:id").delete(async (req, res) => {
    const id = req.params.id

    Song.findByIdAndDelete({ _id: id }, function (err) {
        if (!err) console.log("Song deleted")
        else console.log("error: ", err)
    })
})

export { router }
