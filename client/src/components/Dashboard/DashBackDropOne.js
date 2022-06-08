import React, { useEffect } from "react"

const DashBackDropOne = ({
    activeColor,
    trackIndex,
    isPlaying,
    isOnePlaying,
}) => {
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--active-color",
            activeColor,
        )
    }, [trackIndex, activeColor])

    return (
        <div
            className={`color-bd ${
                isPlaying && isOnePlaying ? "playing" : "idle"
            }`}
        />
    )
}

export default DashBackDropOne
