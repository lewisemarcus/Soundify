import React, { useEffect, useState } from "react"
// import "./styles/DashboardPlayer.css"
import AudioPlayer from "./AudioPlayer"

const AudioPlayerContainer = ({ playlistSong, setSelectedSong, selectedSong, newTitle, r, setR }) => {
    const [songs, setSongs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // console.log(newTitle)
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const songData = await fetch("/songs", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })

                const songList = await songData.json()

                setSongs(songList)
                setIsLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        fetchSongs()
    }, [])

    return isLoading ? (
        "loading"
    ) : (
        <div className="PlaylistPlayer">
            <AudioPlayer
                tracks={songs}
                playlistSong={playlistSong}
                selectedSong={selectedSong}
                setSelectedSong={setSelectedSong}
                newTitle={newTitle}
                r={r}
                setR={setR}
            />
        </div>
    )
}

export default AudioPlayerContainer
