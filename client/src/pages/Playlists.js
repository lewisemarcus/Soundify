import { useState, useEffect } from "react"
// import AudioPlayerContainer from "../components/MusicPlayer/AudioPlayerContainer";

import "./styles/Playlists.css"
import { Empty } from "antd"
import { useQuery } from "@apollo/client"
import { GET_USER_PLAYLIST } from "../utils/queries/songQueries"
import { useLocation } from "react-router-dom"
import PlaylistList from "../components/PlaylistLists"
import { Box, CircularProgress } from "@mui/material"
import playlistIcon from "../assets/playlist.png"

const Playlists = ({
    currentPlayer,
    singlePL,
    setSinglePL,
    setIsPlaying,
    isPlaying,
    currentSong,
    getSongInfo,
    setCurrentSong,
}) => {
    const username = localStorage.getItem("username")
    const [playlistClicked, setPlaylistClicked] = useState(false)
    const [title, setPlTitle] = useState("")
    const [playlistSong, setPlaylistSong] = useState()
    const [selectedSong, setSelectedSong] = useState(false)
    const [newTitle, setTitle] = useState()
    const [activeState, setActiveState] = useState(-1)

    const [r, setR] = useState(false)
    const location = useLocation()

    const {
        loading: playlistloading,
        data,
        refetch,
    } = useQuery(GET_USER_PLAYLIST, {
        variables: { owner: username },
    })
    let currentPlaylists = data?.userPlaylists || []

    useEffect(() => {
        if (data !== undefined)
            localStorage.setItem("playlists", JSON.stringify(currentPlaylists))
    }, [currentPlaylists])

    useEffect(() => {
        return setPlaylistClicked(false) && setSinglePL([])
    }, [])

    useEffect(() => {
        const fetchPlaylists = async () => {
            await refetch()
        }
        fetchPlaylists()
    }, [location.pathname])

    useEffect(() => {
        localStorage.setItem("singlePL", JSON.stringify(singlePL))
    }, [singlePL])

    const switchPlaylist = (e) => {
        e.preventDefault()
        setPlTitle(e.currentTarget.outerText)
        setPlaylistClicked(true)

        for (let i = 0; i < currentPlaylists.length; i++) {
            if (currentPlaylists[i]._id === e.currentTarget.id) {
                setSinglePL(currentPlaylists[i])
            }
        }
    }

    return playlistloading ? (
        <div>
            {" "}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "14rem",
                }}
            >
                <CircularProgress style={{ color: "orange" }} />
            </Box>
        </div>
    ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
            <div className="playlist-name-container">
                <h2>Playlists:</h2>

                {currentPlaylists.map((playlist, index) => {
                    return (
                        <div
                            key={playlist.plTitle}
                            id={playlist._id}
                            onClick={(e) => {
                                switchPlaylist(e)
                                setActiveState(index)
                            }}
                            className={`playlist-button ${
                                index === activeState ? "active" : null
                            }`}
                        >
                            <img src={playlistIcon} alt="Playlist" />
                            <div className="play-title">{playlist.plTitle}</div>
                        </div>
                    )
                })}
            </div>
            <div className="playlist-container">
                <div className="content">
                    {playlistClicked ? (
                        <PlaylistList
                            currentPlayer={currentPlayer}
                            data={singlePL}
                            setIsPlaying={setIsPlaying}
                            isPlaying={isPlaying}
                            currentSong={currentSong}
                            getSongInfo={getSongInfo}
                            setCurrentSong={setCurrentSong}
                        />
                    ) : (
                        <div className="no-playlist-selected">
                            <Empty description="No playlist selected" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Playlists
