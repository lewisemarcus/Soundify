import React from "react"
import { ReactComponent as Play } from "./assets/play.svg"
import { ReactComponent as Pause } from "./assets/pause.svg"
import { ReactComponent as Next } from "./assets/next.svg"
import { ReactComponent as Prev } from "./assets/prev.svg"

const DashAudioControlThree = ({
    isPlaying,
    onPlayPauseClick,
    onPrevClick,
    onNextClick,
    genreBool,
    getThree,
    isThreePlaying,
    setCurrent,
    setSongObject,
    songInfo,
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
        {isPlaying && isThreePlaying && !genreBool ? (
            <button
                type="button"
                className="pause-btn"
                onClick={() => {
                    setCurrent(document.getElementById("three"))
                    getThree(false)
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
                    setSongObject(songInfo)
                    setCurrent(document.getElementById("three"))
                    getThree(true)
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

export default DashAudioControlThree
