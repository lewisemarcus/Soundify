import pkg from "aws-sdk"
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3"
const { S3 } = pkg
import dotenv from "dotenv"
dotenv.config()
import Song from "../models/Songs.js"
import User from "../models/User.js"
let imageLocation
const s3Client = new S3Client({ region: "us-west-1" })
const s3 = new S3({
    apiVersion: "latest",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const uploadImage = (content) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: content.filename,
            Bucket: content.bucketname,
            Body: content.file,
            ContentType: "image/jpeg",
            ACL: "public-read",
        }

        s3.upload(params, async (err, data) => {
            if (err) reject(err)
            else {
                imageLocation = data.Location
                resolve(data)
            }
        })
    })
}

const uploadSong = (content, song) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: content.filename,
            Bucket: content.bucketname,
            Body: content.file,
            ContentType: "audio/mpeg",
            ACL: "public-read",
        }

        s3.upload(params, async (err, data) => {
            if (err) reject(err)
            else {
                const newSong = new Song({
                    title: song.title,
                    genre: song.genre,
                    genre: song.genre,
                    tags: song.tags,
                    artist: song.artist,
                    username: song.username,
                    filename: content.filename,
                    cover: imageLocation,
                    link: data.Location,
                })
                newSong.save()
                await User.findOneAndUpdate(
                    { username: song.username },
                    { $addToSet: { songs: newSong._id } },
                )
                resolve(data)
            }
        })
    })
}

const deleteSong = async (key) => {
    try {
        const data = await s3Client.send(
            new DeleteObjectCommand({ Bucket: "soundclone-music", Key: key }),
        )
        console.log("Success. Object deleted.", data)
        return data
    } catch (err) {
        console.log("Error.", err)
    }
}

export { uploadSong, deleteSong, uploadImage }
