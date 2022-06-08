import React, { useEffect } from "react"

const DashBackDropThree = ({
    activeColor,
    trackIndex,
    isPlaying,
    isThreePlaying,
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
                isPlaying && isThreePlaying ? "playing" : "idle"
            }`}
        />
    )
}

export default DashBackDropThree
