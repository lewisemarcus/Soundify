import React, { useState, useEffect, createRef, useRef } from "react"
import { SongDetailsPlayer, getVolume } from "../components/SongDetailsPlayer"
import "../components/styles/Slider.css"
import { useParams } from "react-router-dom"
import gradient from "../assets/gradient.png"
import shakeygraves from "../assets/shakeygraves.jpg"
import LoadMoreList from "../components/CommentSection"
import Waveform from "../components/Wavesurfer"

const song = new Audio("https://soundclone-music.s3.amazonaws.com/qwe")

const SongDetails = () => {
    const { songId } = useParams()
    const [volume, setVolume] = useState(0.25)
    const app = createRef()
    const volumeSlider = createRef()
    let loadedPlayer = false
    let isLoaded = useRef(loadedPlayer)

    useEffect(() => {
        // if (isLoaded.current === false)
        //     SongDetailsPlayer(
        //         "https://soundclone-music.s3.amazonaws.com/qwe",
        //         app,
        //         gradient,
        //         volume,
        //     )
        getVolume(volume)
        console.log(volumeSlider.current)
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
                            margin: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img src={shakeygraves} alt="Album Cover" />
                        <h1 style={{ color: "white" }}>Song Title</h1>
                    </div>
                    <Waveform
                        url={"https://soundclone-music.s3.amazonaws.com/qwe"}
                    />
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {/* <div
                        ref={app}
                        id="canvasContainer"
                        style={containerStyle}
                    ></div> */}
                </div>
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
