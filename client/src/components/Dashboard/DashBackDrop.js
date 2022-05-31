import React, { useEffect } from "react"

const DashBackDrop = ({ activeColor, trackIndex, isPlaying }) => {
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--active-color",
            activeColor,
        )
    }, [trackIndex, activeColor])

    return <div className={`color-bd ${isPlaying ? "playing" : "idle"}`} />
}

export default DashBackDrop
