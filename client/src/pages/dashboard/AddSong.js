import React, { useState, useEffect, createRef } from "react"
import axios from "axios"
import p5 from "p5"
import "../../utils/p5/addons/p5.sound.js"
import WaveSurfer from "wavesurfer.js"

const canvasStyle = {
    position: "relative",
    top: 0,
    left: 0,
    background: "black",
    width: "25%",
    height: "25%",
}

const audioStyle = {
    width: "25%",
}

const containerStyle = {
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
}

const waveForm = {
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 100,
    height: "100%",
}
const AddSong = () => {
    const canvasRef = createRef()

    const audioElement = createRef()

    const app = createRef()

    const [songs, setSongs] = useState([
        {
            _id: "",
            title: "",
            genre: "",
            id: "",
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

    const [wave, setWave] = useState(null)

    let count = 0

    const playAudio = () => {
        console.log("hi")
        wave.play()
    }

    const pauseAudio = () => {
        wave.pause()
    }

    useEffect(() => {
        console.log(document.getElementById("waveform"))
        const wavesurfer = WaveSurfer.create({
            container: "#waveform",
            waveColor: "#1d43ad",
            progressColor: "#0d2344",
            mediaControls: true,
            responsive: true,
            backend: "MediaElement",
        })

        wavesurfer.load("https://soundclone-music.s3.amazonaws.com/qwe")
        wavesurfer.setMute(true)

        setWave(wavesurfer)

        const fetchSongs = async () => {
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
        fetchSongs()

        let newP5 = new p5(sketch, app.current)

        return () => {
            newP5.remove()
        }
    }, [])

    //WHY IS CURRENT NULL BUT NOT WHEN JUST CALLING audioElement?
    console.log(audioElement)
    console.log(audioElement.current)
    const sketch = (p) => {
        let fft, canvas, mySound

        //WHY IS IT THAT .currentSrc disappears when being called directly, but not indirectly?
        console.log(audioElement.current)
        console.log(audioElement.current.currentSrc)
        function preload() {
            mySound = p5.prototype.loadSound(
                "https://soundclone-music.s3.amazonaws.com/qwe",
            )
        }
        preload()

        p.setup = () => {
            canvas = p.createCanvas(710, 400)
            p.noFill()
            canvas.style.marginBottom = 100
            p.getAudioContext()

            const audioCtx = p.getAudioContext()

            const source = audioCtx.createMediaElementSource(
                document.querySelector("audio"),
            )
            console.log(source)
            source.connect(p5.soundOut)

            fft = new p5.FFT()

            fft.setInput(source)

            // p.noLoop()
        }
        p.draw = () => {
            //mySound loads in draw

            p.background(200)

            //SPECTRUM STYLE ONE
            let spectrum = fft.analyze()

            p.beginShape()
            p.stroke("#1d43ad")
            const level = fft.getEnergy("mid")
            p.strokeWeight(level / 125)

            const invertedSpectrum = spectrum.slice().reverse()
            const values = invertedSpectrum.concat(spectrum)

            for (var i = 0; i < values.length; i++) {
                var x = p.map(i, 0, values.length, 0, p.width)
                var y = p.map(values[i], 0, 255, 0, p.height / 4)
                if (i % 2 === 0) y *= -1
                p.curveVertex(x, y + p.height / 2)
            }

            // for (let i = 0; i < spectrum.length / 20; i++) {
            //     p.fill(spectrum[i], spectrum[i] / 10, 0)
            //     let x = p.map(i, 0, spectrum.length / 20, 0, p.width)
            //     let h = p.map(spectrum[i], 0, 255, 0, p.height)
            //     p.rect(x, p.height, spectrum.length / 20, -h)
            // }

            // spectrum.forEach((spec, i) => {
            //     p.vertex(i, p.map(spec, 0, 255, p.height, 0))
            // })

            //WAVEFORM STYLE

            // let waveform = fft.waveform()

            // let bufferLength = waveform.length

            // p.beginShape()
            // p.strokeWeight(10)
            // p.stroke("#1d43ad")

            // for (let i = 0; i < bufferLength; i++) {
            //     let x = p.map(i, 0, bufferLength, 0, p.width)
            //     let y = p.map(waveform[i], -1, 1, -p.height / 2, p.height / 2)
            //     p.vertex(x, y + p.height / 2)
            // }

            p.endShape()
        }
    }

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
        // const post = await axios.post("/upload", newSong, {
        //     headers: { "content-type": "multipart/form-data" },
        // })
        // console.log(post.json())
        console.log("song added")
    }

    function deleteSong(id) {
        axios.delete(`/delete/${id}`)
        alert("song deleted")
    }

    return (
        <div className="App">
            <h1>Add a Song</h1>
            <form action="/upload" method="POST" encType="multipart/form-data">
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
            {songs.map((song, index) => {
                return (
                    <div key={index}>
                        <h1>Title: {song.title}</h1>
                        <p>Year: {song.year}</p>
                        <p>Genre: {song.genre}</p>
                        <p>Link: {song.link}</p>
                        <button onClick={() => deleteSong(song._id)}>
                            DELETE
                        </button>

                        <div
                            ref={app}
                            id="canvasContainer"
                            style={containerStyle}
                        >
                            <audio
                                onPlay={playAudio}
                                onPause={pauseAudio}
                                crossOrigin="anonymous"
                                ref={audioElement}
                                style={audioStyle}
                                src={song.link}
                                id={song._id}
                                controls
                            ></audio>
                        </div>
                    </div>
                )
            })}
            <button onClick={playAudio}>PLAY</button>

            <div id="waveform" style={waveForm}></div>
        </div>
    )
}

export default AddSong
