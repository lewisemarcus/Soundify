import React, { useEffect } from "react"

const DashBackDropTwo = ({
    activeColor,
    trackIndex,
    isPlaying,
    isTwoPlaying,
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
                isPlaying && isTwoPlaying ? "playing" : "idle"
            }`}
        />
    )
}

export default DashBackDropTwo
