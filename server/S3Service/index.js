import pkg from "aws-sdk"
const { S3 } = pkg
import dotenv from "dotenv"
dotenv.config()
import Song from "../models/Songs.js"
import User from "../models/User.js"
const s3 = new S3({
    // Jason - add changed here ***
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
})

const uploadSong = (content, song) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: content.filename,
            Bucket: content.bucketname,
            Body: content.file,
            ContentType: "audio/mpeg",
            ACL: "public-read",
        }

        s3.upload(params, (err, data) => {
            if (err) reject(err)
            else {
                const newSong = new Song({
                    title: song.title,
                    genre: song.genre,
                    tags: song.tags,
                    artist: song.artist,
                    username: song.username,
                    filename: song.filename,
                    link: data.Location,
                })
                newSong.save()
                User.findOneAndUpdate(
                    { username: song.username },
                    { $addToSet: { songs: newSong._id } },
                )
                resolve(data)
            }
        })
    })
}

export default uploadSong
