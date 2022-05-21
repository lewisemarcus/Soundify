import React, { useState, useEffect, useRef } from "react"

import "../components/styles/Slider.css"
import { useParams } from "react-router-dom"
import AudioSpectrum from "react-audio-spectrum"
import shakeygraves from "../assets/shakeygraves.jpg"
import LoadMoreList from "../components/CommentSection"
import Waveform from "../components/Wavesurfer"

const song = new Audio("https://soundclone-music.s3.amazonaws.com/qwe")

const SongDetails = () => {
    const { songId } = useParams()
    const audio = useRef(null)
    const [width, setWidth] = useState(1075)
    let loadedPlayer = false
    let isLoaded = useRef(loadedPlayer)

    useEffect(() => {
        console.log(window.innerWidth)
        window.addEventListener("resize", function () {
            setWidth(window.innerWidth * (1075 / 1280))
        })
        isLoaded.current = true
    })

    return (
        <div
            style={{
                backgroundColor: "#141414",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    backgroundColor: "#434343",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        background:
                            "linear-gradient(315deg, hsla(29, 81%, 61%, 1) 0%, hsla(0, 0%, 0%, 1) 86%)",
                        display: "flex",
                        flexWrap: "wrap",
                        width: "85%",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            zIndex: 1000,
                            margin: 10,
                            marginBottom: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img src={shakeygraves} alt="Album Cover" />
                        <h1 style={{ color: "white" }}>Song Title</h1>
                    </div>
                    <Waveform song={song} audio={audio} />
                    <div
                        style={{
                            marginTop: -50,
                            position: "relative",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        <AudioSpectrum
                            height={100}
                            width={width}
                            id="audio-canvas"
                            audioId="audio-element"
                        />
                        <audio
                            id="audio-element"
                            crossOrigin="anonymous"
                            ref={audio}
                            src={song.src}
                        ></audio>
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}></div>
            </div>
            <div
                style={{
                    background: "#F1EEE9",
                    width: "60%",
                    display: "flex",

                    flexWrap: "wrap",

                    flexDirection: "column",
                }}
            >
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ margin: 10, marginLeft: 20 }}>Comments: </div>
                    <button style={{ margin: 10 }}>Share</button>
                    <button style={{ margin: 10 }}>Add to Playlist</button>
                    <div style={{ margin: 10, marginRight: 20 }}>Likes: </div>
                </div>
                <LoadMoreList style={{ width: "100%" }} />
            </div>
        </div>
    )
}

export default SongDetails
