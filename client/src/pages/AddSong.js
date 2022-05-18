import React, { useState, useEffect, createRef } from "react"
import axios from "axios"
import p5 from "p5"
import "../utils/p5/addons/p5.sound.js"

const containerStyle = {
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
}

const AddSong = () => {
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

    const [currentSong, setCurrentSong] = useState("")

    const renderSketch = (songLink) => {
        const sketch = (p) => {
            let fft, canvas, mySound, wave, background, distance, w

            p.preload = () => {
                mySound = p.loadSound(songLink)
            }

            p.setup = () => {
                background = 200
                let playButton = p.createButton("Play")
                playButton.style("border-radius", "5px")
                playButton.id("button")
                playButton.mouseOver(() => {
                    playButton.style("border-radius", "10px")
                })
                console.log("waddup", document.getElementById("button"))
                // playButton.position(window.width, window.height)
                p.rectMode(p.CENTER)
                p.angleMode(p.DEGREES)
                canvas = p.createCanvas(600, 600)
                p.noFill()
                console.log(p.drawingContext.scale)

                canvas.style.marginBottom = 100
                p.getAudioContext()
                if (mySound)
                    if (mySound.isLoaded()) wave = mySound.getPeaks(p.width)
                fft = new p5.FFT()
                w = 3
                // w = p.width / 200
                // p.noLoop()
            }

            p.draw = () => {
                //mySound loads in draw
                p.scale(1)
                p.background(background)
                p.beginShape()
                p.stroke("#1d43ad")

                //SPECTRUM STYLE ONE
                let spectrum = fft.analyze()

                const invertedSpectrum = spectrum.slice().reverse()
                const values = invertedSpectrum.concat(spectrum)
                distance = p.dist(p.mouseX, p.mouseY, 100, 100)

                if (distance < 50) {
                    background = 0
                } else {
                    background = 200
                }

                for (var i = 0; i < values.length; i++) {
                    p.fill(values[i], values[i] / 10, 0)
                    var x = p.map(i, 0, values.length, 0, p.width)
                    var y = p.map(values[i], 0, 255, 0, p.height / 8)
                    if (i % 2 === 0) y *= -1
                    p.curveVertex(x, 100 + y + p.height / 2)
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

                // p.strokeWeight(10)
                // p.stroke("#1d43ad")

                // for (let i = 0; i < bufferLength; i++) {
                //     let x = p.map(i, 0, bufferLength, 0, p.width)
                //     let y = p.map(waveform[i], -1, 1, -p.height / 2, p.height / 2)
                //     p.vertex(x, y + p.height / 2)
                // }

                //WAVEFORM STYLE TWO
                p.strokeWeight(2)
                for (let i = 0; i < wave.length; i++) {
                    let peak = wave[i]
                    let l = p.map(peak, -1, 1, -50, 50)

                    p.line(i * w, p.height / 4 + l, i * w, p.height / 4 - l)
                    // p.rect(i, p.height / 4, 2, l)
                }
                p.strokeWeight(1)
                const hpos = p.map(
                    mySound.currentTime(),
                    0,
                    mySound.duration(),
                    0,
                    p.width,
                )

                p.stroke(200, 0, 0)
                p.line(hpos, 100, hpos, p.height / 2.5)

                p.endShape()
            }

            p.mousePressed = (e) => {
                if (e.target.id === "button") {
                    if (mySound.isPaused() || mySound.currentTime() === 0)
                        mySound.play()
                    else mySound.pause()
                } else return
                // let hpos = p.map(p.mouseX, 0, mySound.duration(), 0, p.width)

                // p.line(hpos, 0, hpos, p.height)
            }
        }

        return new p5(sketch, app.current)
    }

    const sketch = (p) => {
        let fft, canvas, mySound, wave, background, distance, w

        p.preload = () => {
            mySound = p.loadSound(
                "https://soundclone-music.s3.amazonaws.com/qwe",
            )
        }

        p.setup = () => {
            background = 200
            let playButton = p.createButton("Play")
            playButton.style("border-radius", "5px")
            playButton.id("button")
            playButton.mouseOver(() => {
                playButton.style("border-radius", "10px")
            })
            console.log("waddup", document.getElementById("button"))
            // playButton.position(window.width, window.height)
            p.rectMode(p.CENTER)
            p.angleMode(p.DEGREES)
            canvas = p.createCanvas(600, 600)
            p.noFill()
            console.log(p.drawingContext.scale)

            canvas.style.marginBottom = 100
            p.getAudioContext()
            if (mySound)
                if (mySound.isLoaded()) wave = mySound.getPeaks(p.width)
            fft = new p5.FFT()
            w = 3
            // w = p.width / 200
            // p.noLoop()
        }

        p.draw = () => {
            //mySound loads in draw
            p.scale(1)
            p.background(background)
            p.beginShape()
            p.stroke("#1d43ad")

            //SPECTRUM STYLE ONE
            let spectrum = fft.analyze()

            const invertedSpectrum = spectrum.slice().reverse()
            const values = invertedSpectrum.concat(spectrum)
            distance = p.dist(p.mouseX, p.mouseY, 100, 100)

            if (distance < 50) {
                background = 0
            } else {
                background = 200
            }

            for (var i = 0; i < values.length; i++) {
                p.fill(values[i], values[i] / 10, 0)
                var x = p.map(i, 0, values.length, 0, p.width)
                var y = p.map(values[i], 0, 255, 0, p.height / 8)
                if (i % 2 === 0) y *= -1
                p.curveVertex(x, 100 + y + p.height / 2)
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

            // p.strokeWeight(10)
            // p.stroke("#1d43ad")

            // for (let i = 0; i < bufferLength; i++) {
            //     let x = p.map(i, 0, bufferLength, 0, p.width)
            //     let y = p.map(waveform[i], -1, 1, -p.height / 2, p.height / 2)
            //     p.vertex(x, y + p.height / 2)
            // }

            //WAVEFORM STYLE TWO
            p.strokeWeight(2)
            for (let i = 0; i < wave.length; i++) {
                let peak = wave[i]
                let l = p.map(peak, -1, 1, -50, 50)

                p.line(i * w, p.height / 4 + l, i * w, p.height / 4 - l)
                // p.rect(i, p.height / 4, 2, l)
            }
            p.strokeWeight(1)
            const hpos = p.map(
                mySound.currentTime(),
                0,
                mySound.duration(),
                0,
                p.width,
            )

            p.stroke(200, 0, 0)
            p.line(hpos, 100, hpos, p.height / 2.5)

            p.endShape()
        }

        p.mousePressed = (e) => {
            if (e.target.id === "button") {
                if (mySound.isPaused() || mySound.currentTime() === 0)
                    mySound.play()
                else mySound.pause()
            } else return
            // let hpos = p.map(p.mouseX, 0, mySound.duration(), 0, p.width)

            // p.line(hpos, 0, hpos, p.height)
        }
    }

    const load = () => {
        console.log(document.getElementById("button"))
    }

    useEffect(() => {
        // let newP5 = new p5(sketch, app.current)
        window.onload = load

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

        // return () => {
        //     newP5.remove()
        // }
    }, [currentSong])

    function handleChange(event) {
        const { name, value } = event.target

        setSong((prevInput) => {
            return {
                ...prevInput,
                [name]: value,
            }
        })
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
                <input type="submit" value="Upload" />
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
                        <button
                            onClick={() => {
                                renderSketch(song.link)
                            }}
                        >
                            PLAY
                        </button>

                        <div
                            ref={app}
                            id="canvasContainer"
                            style={containerStyle}
                        ></div>
                    </div>
                )
            })}
        </div>
    )
}

export default AddSong
