import React from "react"
import FooterAudioPlayer from "./FooterPlayer/FooterAudioPlayer"

const Footer = ({
    currentSong,
    oneSongClick,
    setOneSongClick,
    audioR,
    genreClickCount,
    playing,
    prevCount,
    currentPlayer,

    isPlaying,
    setIsPlaying,
    footerId,
    songInfo,
    trackIndex,
    getTrackIndex,
    trackProgress,
    setTrackProgress,
}) => {
    return (
        // this link needs to be changed upon new click
        <div className="footer-container" dashid={`dash-${footerId}`}>
            <FooterAudioPlayer
                trackProgress={trackProgress}
                setTrackProgress={setTrackProgress}
                songInfo={songInfo}
                trackIndex={trackIndex}
                getTrackIndex={getTrackIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentPlayer={currentPlayer}
                prevCount={prevCount}
                playing={playing}
                genreClickCount={genreClickCount}
                audioR={audioR}
                currentSong={currentSong}
                oneSongClick={oneSongClick}
                setOneSongClick={setOneSongClick}
            />
        </div>
    )
}
export default Footer
