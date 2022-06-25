import React, { useState } from "react"
// import "./styles/DashboardPlayer.css"
import AudioPlayer from "./AudioPlayer"

const AudioPlayerContainer = ({
    playlistSong,
    setSelectedSong,
    selectedSong,
    newTitle,
    r,
    setR,
    currentPlayer,
    singlePL,
}) => {
    const [songs, setSongs] = useState()

    let newPlaylist = singlePL || JSON.parse(localStorage.getItem("singlePL"))
    console.log(playlistSong)
    return (
        <div className="PlaylistPlayer">
            {Object.values(newPlaylist).length !== 0 ? (
                <AudioPlayer
                    singlePL={newPlaylist}
                    playlistSong={playlistSong}
                    selectedSong={selectedSong}
                    setSelectedSong={setSelectedSong}
                    newTitle={newTitle}
                    r={r}
                    setR={setR}
                    currentPlayer={currentPlayer}
                />
            ) : (
                <div style={{ color: "white", fontWeight: "bolder" }}>
                    No playlist selected!
                </div>
            )}
        </div>
    )
}

export default AudioPlayerContainer
