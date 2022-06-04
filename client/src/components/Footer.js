import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import FooterAudioPlayer from "./FooterPlayer/FooterAudioPlayer"
import Footertracks from "./FooterPlayer/Footertracks"

const Footer = ({ currentSong, oneSongClick, setOneSongClick, audioR }) => {
    const location = useLocation()
    useEffect(() => {
        console.log(audioR)
    }, [location])
    // console.log(currentSong)
    return (
        // this link needs to be changed upon new click
        <div className="footer-container">
            <FooterAudioPlayer
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
