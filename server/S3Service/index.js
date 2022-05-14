import pkg from "aws-sdk"
const { S3 } = pkg
import dotenv from "dotenv"
dotenv.config()
import Song from "../models/Songs.js"
const s3 = new S3({
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
                    year: song.year,
                    filename: song.filename,
                    link: data.Location,
                })
                newSong.save()
                resolve(data)
            }
        })
    })
}

export default uploadSong
