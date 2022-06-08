import React, { useEffect, useState } from "react"
// import "./styles/DashboardPlayer.css"
import AudioPlayer from "./AudioPlayer"
import { GET_PLAYLIST } from "../../utils/queries/songQueries"
import { useQuery } from "@apollo/client"

const AudioPlayerContainer = ({ 
    playlistSong, 
    setSelectedSong, 
    selectedSong, 
    newTitle, 
    r, 
    setR,
    setCurrentSong,
    currentPlayer,
    singlePL
}) => {
        console.log(singlePL)
        const [songs, setSongs] = useState()
        // console.log(localStorage)
        const [isLoading, setIsLoading] = useState(true)
        let newPlaylist = singlePL || JSON.parse(localStorage.getItem("playlists")).userPlaylists[0].songs
        
        useEffect(() => {
            // console.log(Object.values(newPlaylist.userPlaylists).length)
            // setSongs(newPlaylist.userPlaylists[0].songs)
        },[])

    return (
        <div className="PlaylistPlayer">
            {Object.values(newPlaylist).length !== 0 ? (
                <AudioPlayer
                tracks={newPlaylist.songs}
                playlistSong={playlistSong}
                selectedSong={selectedSong}
                setSelectedSong={setSelectedSong}
                newTitle={newTitle}
                r={r}
                setR={setR}
                currentPlayer={currentPlayer}
                setCurrentSong={setCurrentSong}
            />
            ) : (
                <div>No playlists found!</div>
            )}
            
        </div>
    )
}

export default AudioPlayerContainer
