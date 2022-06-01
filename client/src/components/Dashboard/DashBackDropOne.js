import React, { useEffect } from "react"

const DashBackDropOne = ({ activeColor, trackIndex, isPlaying }) => {
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--active-color",
            activeColor,
        )
    }, [trackIndex, activeColor])

    return <div className={`color-bd ${isPlaying ? "playing" : "idle"}`} />
}

export default DashBackDropOne
