import React from "react"
import FooterAudioPlayer from "./FooterPlayer/FooterAudioPlayer"

const Footer = ({
    setCurrentSong,
    currentSong,
    oneSongClick,
    setOneSongClick,
    genreClickCount,
    playing,
    prevCount,
    currentPlayer,
    isPlaying,
    setIsPlaying,
    singlePL,
    songInfo,
    trackIndex,
    getTrackIndex,
    trackProgress,
    setTrackProgress,
}) => {
    return (
        // this link needs to be changed upon new click
        <div className="footer-container">
            <FooterAudioPlayer
                setCurrentSong={setCurrentSong}
                singlePL={singlePL}
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
                currentSong={currentSong}
                oneSongClick={oneSongClick}
                setOneSongClick={setOneSongClick}
            />
        </div>
    )
}
export default Footer
