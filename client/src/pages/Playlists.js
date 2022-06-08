import { useState, useEffect } from "react"
import AudioPlayerContainer from "../components/MusicPlayer/AudioPlayerContainer"
import { AiFillCloseCircle } from "react-icons/ai"
import "./styles/Playlists.css"
import { Row, Col } from "antd"
import { useQuery, useLazyQuery } from "@apollo/client"
import { qrySongs, GET_USER_PLAYLIST } from "../utils/queries/songQueries"
import { useLocation } from "react-router-dom"

const Playlists = ({
    currentPlayer,
    setCurrentSong,
    singlePL,
    setSinglePL,
    setPlaylists,
    playlists,
    setPlaylistClicked,
    playlistClicked,
}) => {
    const username = localStorage.getItem("username")
    const { loading, data: songData } = useQuery(qrySongs)
    const [playlistSong, setPlaylistSong] = useState()
    const [selectedSong, setSelectedSong] = useState(false)
    const [newTitle, setTitle] = useState()
    const songs = songData?.songs || []
    const [r, setR] = useState(false)
    const location = useLocation()
    let audioList = []

    const {
        loading: playlistloading,
        data,
        refetch,
    } = useQuery(GET_USER_PLAYLIST, {
        variables: { owner: username },
    })
    const usersPlaylists = data?.userPlaylists || []
    useEffect(() => {
        console.log("hi")
        if (data !== undefined)
            localStorage.setItem("playlists", JSON.stringify(usersPlaylists))
    }, [usersPlaylists])

    useEffect(() => {
        console.log("hi2")
        //if (usersPlaylists.length !== 0) setPlaylists(usersPlaylists)
    }, [usersPlaylists])
    // useEffect(() => {
    //     async function loadPlists() {
    //         let { data } = await refetchPlaylists()
    //         setPlaylists(data.userPlaylists)
    //         localStorage.setItem(
    //             "playlists",
    //             JSON.stringify(data.userPlaylists),
    //         )
    //         return data
    //     }
    //     loadPlists()
    // }, [location.pathname])

    useEffect(() => {
        refetch()
        if (usersPlaylists[0] !== undefined) {
            setSinglePL(usersPlaylists[0])
        }
    }, [playlists, location.pathname])

    useEffect(() => {
        localStorage.setItem("singlePL", JSON.stringify(singlePL))
    }, [singlePL])

    const switchPlaylist = (e) => {
        e.preventDefault()
        setPlaylistClicked(true)
        for (let i = 0; i < usersPlaylists.length; i++) {
            if (usersPlaylists[i]._id === e.currentTarget.id) {
                setSinglePL(usersPlaylists[i])
            }
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (setPlaylistSong !== undefined && selectedSong !== undefined) {
            setSelectedSong(true)
            setPlaylistSong(e.currentTarget.name)
            setTitle(e.currentTarget.title)
            let title = e.currentTarget.parentNode
            let find = document.querySelectorAll(".active")
            find.forEach((find) => {
                find.classList.remove("active")
            })
            title.classList.add("active")
            setR(true)
        }
    }
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div style={{ marginBottom: 100, height: "100vh" }}>
            <div>
                <aside className="playlistNames">
                    <h2
                        style={{
                            color: "white",
                            fontWeight: "bolder",
                        }}
                    >
                        Playlists:
                    </h2>
                    {usersPlaylists.map((playlist) => {
                        return (
                            <button
                                style={{
                                    color: "white",
                                    fontWeight: "bolder",
                                    padding: 5,
                                }}
                                key={playlist.title}
                                id={playlist._id}
                                onClick={switchPlaylist}
                                className="playlist-List"
                            >
                                {playlist.plTitle}
                            </button>
                        )
                    })}
                </aside>
                <div className="Playlist-container">
                    <AudioPlayerContainer
                        playlistSong={playlistSong}
                        selectedSong={selectedSong}
                        setSelectedSong={setSelectedSong}
                        newTitle={newTitle}
                        r={r}
                        setR={setR}
                        currentPlayer={currentPlayer}
                        setCurrentSong={setCurrentSong}
                        singlePL={singlePL}
                    />
                    <div className="item">
                        <div className="content">
                            <h2 className="playlist-title">Playlist Name:</h2>
                            <div className="headers">
                                <Row>
                                    <Col span={8}>
                                        <h2 className="playlist-header">
                                            Title
                                        </h2>
                                    </Col>
                                    <Col span={8}>
                                        <h2 className="playlist-header">
                                            Artist
                                        </h2>
                                    </Col>
                                    <Col span={8}>
                                        <h2 className="playlist-header">
                                            Remove
                                        </h2>
                                    </Col>
                                </Row>
                            </div>
                            {singlePL.songs &&
                                playlistClicked &&
                                singlePL.songs.map((song) => {
                                    console.log(playlistClicked)
                                    return (
                                        <Row key={song._id}>
                                            <button
                                                name={song.link}
                                                title={song.title}
                                                onClick={handleClick}
                                            >
                                                <Col span={8}>
                                                    <h2 className="playlist-header">
                                                        {song.title}
                                                    </h2>
                                                </Col>
                                            </button>
                                            <Col span={8}>
                                                <h2 className="playlist-header">
                                                    {song.artist}
                                                </h2>
                                            </Col>
                                            <Col span={8}>
                                                <button id="removeBtn">
                                                    <div>
                                                        <span
                                                            className="trashcan"
                                                            style={{
                                                                color: "red",
                                                                marginTop:
                                                                    "7px",
                                                            }}
                                                        >
                                                            <AiFillCloseCircle />
                                                        </span>
                                                    </div>
                                                </button>
                                            </Col>
                                        </Row>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Playlists
