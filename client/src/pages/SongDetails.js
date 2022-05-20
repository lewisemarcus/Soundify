import React, { useState, useEffect, createRef } from "react"
import SongDetailsPlayer from "../components/SongDetailsPlayer"
import { useParams } from "react-router-dom"

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
        const sketch = SongDetailsPlayer(
            "https://soundclone-music.s3.amazonaws.com/qwe",
            app,
        )
    })

    return (
        <div>
            <button
                onClick={() => {
                    SongDetailsPlayer(
                        "https://soundclone-music.s3.amazonaws.com/qwe",
                        app,
                    )
                }}
            >
                Play
            </button>
            <div ref={app} id="canvasContainer" style={containerStyle}></div>
        </div>
    )
}

export default SongDetails
