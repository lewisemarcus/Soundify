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
    isOnePlaying,
    isTwoPlaying,
    isThreePlaying,
    isPlaying,
    setIsPlaying,
    footerId,
    songInfo,
    trackIndex,
    getTrackIndex,
}) => {
    return (
        // this link needs to be changed upon new click
        <div className="footer-container" dashid={`dash-${footerId}`}>
            <FooterAudioPlayer
                songInfo={songInfo}
                trackIndex={trackIndex}
                getTrackIndex={getTrackIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isOnePlaying={isOnePlaying}
                isTwoPlaying={isTwoPlaying}
                isThreePlaying={isThreePlaying}
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
