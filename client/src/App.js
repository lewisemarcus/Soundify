import { useState, useEffect } from "react"
import axios from "axios"

function App() {
    const [songs, setSongs] = useState([
        {
            title: "",
            genre: "",
            year: "",
            filename: "",
            link: "",
        },
    ])

    const [song, setSong] = useState({
        title: "",
        genre: "",
        year: "",
        filename: "",
        link: "",
    })

    useEffect(() => {
        console.log("hi")
        fetchSongs()
        async function fetchSongs() {
            try {
                const songData = await fetch("/songs", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })

                const songList = await songData.json()

                setSongs(songList)
            } catch (err) {
                console.log(err)
            }
        }
    })

    function handleChange(event) {
        const { name, value } = event.target

        setSong((prevInput) => {
            return {
                ...prevInput,
                [name]: value,
            }
        })
    }

    function addSong() {
        // event.preventDefault()
        // const newSong = {
        //     title: song.title,
        //     genre: song.genre,
        //     year: song.year,
        //     filename: song.filename.replace(/^.*[\\\/]/, ""),
        //     file: songFile,
        // }
        // console.log(newSong)
        // const post = await axios.post("/newsong", newSong, {
        //     headers: { "content-type": "multipart/form-data" },
        // })
        // console.log(post.json())
        console.log("song added")
    }

    function deletesong(id) {
        axios.delete(`/delete/${id}`)
        alert("song deleted")
    }

    return (
        <div className="App">
            <h1>Add a Song</h1>
            <form action="/newsong" method="POST" encType="multipart/form-data">
                <input
                    onChange={handleChange}
                    name="title"
                    value={song.title}
                ></input>
                <input
                    onChange={handleChange}
                    name="genre"
                    value={song.genre}
                ></input>
                <input
                    onChange={handleChange}
                    name="year"
                    value={song.year}
                ></input>
                <input
                    onChange={handleChange}
                    type="file"
                    id="filename"
                    name="filename"
                    value={song.filename}
                />
                <input type="submit" value="Upload" onClick={addSong} />
            </form>
            {songs.map((song) => {
                return (
                    <div>
                        <h1>Title: {song.title}</h1>
                        <p>Year: {song.year}</p>
                        <p>Genre: {song.genre}</p>
                        <p>Link: {song.link}</p>
                        <button onClick={() => deletesong(song._id)}>
                            DELETE
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default App
