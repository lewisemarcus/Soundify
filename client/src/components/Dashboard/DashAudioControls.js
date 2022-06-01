import React from "react"
import { ReactComponent as Play } from "./assets/play.svg"
import { ReactComponent as Pause } from "./assets/pause.svg"
import { ReactComponent as Next } from "./assets/next.svg"
import { ReactComponent as Prev } from "./assets/prev.svg"

const DashAudioControls = ({
    isPlaying,
    onPlayPauseClick,
    onPrevClick,
    onNextClick,
    genreBool,
    setDashClickOne,
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
        {isPlaying && !genreBool ? (
            <button
                type="button"
                className="pause-btn"
                onClick={(event) => {
                    let dashClicked
                    if (
                        event.target.parentNode.parentNode.parentNode.parentNode
                            .parentNode.attributes.name != undefined
                    )
                        dashClicked =
                            event.target.parentNode.parentNode.parentNode
                                .parentNode.parentNode.attributes.name.nodeValue
                    if (dashClicked === "dashOne") {
                        setDashClickOne(dashClicked)
                    } else if (dashClicked === "dashTwo") {
                        setDashClickOne(dashClicked)
                    } else if (dashClicked === "dashThree") {
                        setDashClickOne(dashClicked)
                    }

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
                onClick={(event) => {
                    let dashClicked
                    if (
                        event.target.parentNode.parentNode.parentNode.parentNode
                            .parentNode.attributes.name != undefined
                    )
                        dashClicked =
                            event.target.parentNode.parentNode.parentNode
                                .parentNode.parentNode.attributes.name.nodeValue
                    if (dashClicked === "dashOne") {
                        setDashClickOne("dashOne")
                    } else if (dashClicked === "dashTwo") {
                        setDashClickOne("dashTwo")
                    } else if (dashClicked === "dashThree") {
                        setDashClickOne("dashThree")
                    }
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

export default DashAudioControls
