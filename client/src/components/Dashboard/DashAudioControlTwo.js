import React from "react"
import { ReactComponent as Play } from "./assets/play.svg"
import { ReactComponent as Pause } from "./assets/pause.svg"
import { ReactComponent as Next } from "./assets/next.svg"
import { ReactComponent as Prev } from "./assets/prev.svg"

const DashAudioControlTwo = ({
    isPlaying,
    onPlayPauseClick,
    onPrevClick,
    onNextClick,
    genreBool,
    getTwo,
    isTwoPlaying,
    setCurrent,
}) => (
    <div className="audio-ctrls">
        <button
            type="button"
            className="previous"
            aria-label="Previous"
            onClick={onPrevClick}
        >
            <Prev />
        </button>
        {isPlaying && isTwoPlaying && !genreBool ? (
            <button
                type="button"
                className="pause-btn"
                onClick={() => {
                    setCurrent(document.getElementById("two"))
                    getTwo(false)
                    onPlayPauseClick(false)
                }}
                aria-label="Pause"
            >
                <Pause />
            </button>
        ) : (
            <button
                type="button"
                className="play-btn"
                onClick={() => {
                    setCurrent(document.getElementById("two"))
                    getTwo(true)
                    onPlayPauseClick(true)
                }}
                aria-label="Play"
            >
                <Play />
            </button>
        )}
        <button
            type="button"
            className="next-btn"
            aria-label="Next"
            onClick={onNextClick}
        >
            <Next />
        </button>
    </div>
)

export default DashAudioControlTwo
