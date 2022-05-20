import React, { useState, useEffect, createRef } from "react"
import SongDetailsPlayer from "../components/SongDetailsPlayer"
import { useParams } from "react-router-dom"
import gradient from "../assets/gradient.png"
import shakeygraves from "../assets/shakeygraves.jpg"

const containerStyle = {
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
}

const SongDetails = () => {
    const { songId } = useParams()
    const app = createRef()

    useEffect(() => {
        SongDetailsPlayer(
            "https://soundclone-music.s3.amazonaws.com/qwe",
            app,
            gradient,
        )
    })

    return (
        <div style={{ backgroundColor: "#141414" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    backgroundColor: "#434343",
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
                    <img src={shakeygraves} />
                </div>
                <div
                    ref={app}
                    id="canvasContainer"
                    style={containerStyle}
                ></div>
            </div>
            <div></div>
        </div>
    )
}

export default SongDetails
