import React from "react"
import FooterAudioPlayer from "./FooterPlayer/FooterAudioPlayer"
import Footertracks from "./FooterPlayer/Footertracks"

const Footer = ({
    currentSong,
    oneSongClick,
    setOneSongClick,
    audioR,
    genreClickCount,
    playing,
    prevCount,
    currentPlayer,
}) => {
    // console.log(currentSong)
    return (
        // this link needs to be changed upon new click
        <div className="footer-container">
            <FooterAudioPlayer
                currentPlayer={currentPlayer}
                prevCount={prevCount}
                playing={playing}
                genreClickCount={genreClickCount}
                audioR={audioR}
                tracks={Footertracks}
                currentSong={currentSong}
                oneSongClick={oneSongClick}
                setOneSongClick={setOneSongClick}
            />
        </div>
    )
}
export default Footer
