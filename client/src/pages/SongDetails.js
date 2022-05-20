import React, { useState, useEffect, createRef, useRef } from "react"
import { SongDetailsPlayer, getVolume } from "../components/SongDetailsPlayer"
import "../components/styles/Slider.css"
import { useParams } from "react-router-dom"
import gradient from "../assets/gradient.png"
import shakeygraves from "../assets/shakeygraves.jpg"
import LoadMoreList from "../components/CommentSection"

const containerStyle = {
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    maxWidth: "100",
    alignItems: "center",
}

const SongDetails = () => {
    const { songId } = useParams()
    const [volume, setVolume] = useState(0.25)
    const app = createRef()
    const volumeSlider = createRef()
    let loadedPlayer = false
    let isLoaded = useRef(loadedPlayer)

    useEffect(() => {
        if (isLoaded.current === false)
            SongDetailsPlayer(
                "https://soundclone-music.s3.amazonaws.com/qwe",
                app,
                gradient,
                volume,
            )
        getVolume(volume)
        console.log(volumeSlider.current)
        volumeSlider.current.addEventListener("mousemove", function () {
            let color = `linear-gradient(0deg, #ec994b ${(volume * 100).toFixed(
                0,
            )}%, rgb(214, 214, 214) ${(volume * 100).toFixed(0)}%)`
            volumeSlider.current.style.background = color
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
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                    backgroundColor: "#434343",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <button
                        id="button"
                        style={{
                            borderRadius: "50%",
                            color: "white",
                            backgroundColor: "#EC994B",
                            width: 50,
                            height: 50,
                            margin: 10,
                        }}
                    >
                        ▶︎
                    </button>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            flexWrap: "wrap",
                            width: 300,
                        }}
                    >
                        <img src={shakeygraves} alt="Album Cover" />
                        <input
                            className="slider"
                            type="range"
                            ref={volumeSlider}
                            min={0}
                            max={1}
                            step={0.02}
                            value={volume}
                            orient="vertical"
                            onChange={(event) => {
                                setVolume(event.target.valueAsNumber)
                            }}
                        />
                        <p style={{ color: "white" }}>
                            Vol: <span>{(volume * 100).toFixed(0)}%</span>
                        </p>
                    </div>
                </div>
                <div
                    ref={app}
                    id="canvasContainer"
                    style={containerStyle}
                ></div>
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
