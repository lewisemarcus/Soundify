import React, { useState, useEffect } from "react"
import orange from "../../assets/orange.png"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "./styles/Dashboard2.scss"
import "swiper/css"
import "swiper/css/navigation"
import { Avatar } from "antd"
import { CircularProgress, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import playBtn from "../../assets/playBtn.png"
import pauseBtn from "../../assets/pauseBtn.png"

const Dashboard2 = ({
    setCurrentSong,
    getSongInfo,
    currentPlayer,
    setIsPlaying,
    isPlaying,
    currentSong,
    setSinglePL,
    trackIndex,
    getTrackIndex,
}) => {
    let navigate = useNavigate()
    const [songs, setSongs] = useState([])
    const [icon, setIcon] = useState(null)
    const [users, setUsers] = useState([])
    const [play, setPlay] = useState(false)
    const [loadingSongs, setIsLoadingSongs] = useState(true)
    const [loadingUsers, setIsLoadingUsers] = useState(true)

    const handleSongClick = (song) => {
        navigate(`/song/${song.id}`)
    }

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

                setIsLoadingSongs(false)
            } catch (err) {
                console.log(err)
            }
        }
        fetchSongs()
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await fetch("/users", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })

                const userList = await userData.json()

                setUsers(userList)
                setIsLoadingUsers(false)
            } catch (err) {
                console.log(err)
            }
        }
        fetchUsers()
    }, [])

    const handleUserClick = (event) => {
        navigate(`/user/${event.currentTarget.attributes.name.value}`)
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-text-container">
                <h2>New Music Now</h2>
                <p>Hear the latest songs uploaded by artists</p>
            </div>
            {loadingSongs ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "4rem",
                    }}
                >
                    <CircularProgress style={{ color: "orange" }} />
                </Box>
            ) : (
                <Swiper
                    breakpoints={{
                        // when window width is >= 280px
                        280: {
                            width: 280,
                            slidesPerView: 1,
                        },
                        // when window width is >= 640px
                        640: {
                            width: 640,
                            slidesPerView: 2,
                        },
                        // when window width is >= 768px
                        768: {
                            width: 768,
                            slidesPerView: 3,
                        },
                        1125: {
                            width: 1125,
                            slidesPerView: 5,
                        },
                    }}
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation
                    className="swiper"
                >
                    {songs.map((song, index) => (
                        <SwiperSlide key={song.id} className="swiper-slide">
                            <input
                                onClick={() => {
                                    getTrackIndex(index)
                                    setPlay(!play)
                                    setIsPlaying(!isPlaying)
                                    if (currentSong !== song.link) {
                                        setPlay(false)
                                        setIsPlaying(true)
                                    }
                                    setCurrentSong(song.link)
                                    setSinglePL([])
                                    getSongInfo({
                                        title: song.title,
                                        artist: song.artist,
                                    })

                                    if (play) {
                                        currentPlayer.current.pause()
                                    } else currentPlayer.current.play()
                                }}
                                type="image"
                                src={
                                    isPlaying && trackIndex === index
                                        ? pauseBtn
                                        : playBtn
                                }
                                name="playBtn"
                                className="playBtn"
                                alt="play button"
                            />
                            <img
                                className="dashboard-song-cover"
                                src={song.cover ? song.cover : orange}
                                alt="Album Cover"
                            />
                            <div className="dashboard-song-detail">
                                <span
                                    className="dashboard-song-title"
                                    onClick={() => handleSongClick(song)}
                                >
                                    {song.title}
                                </span>{" "}
                                <br />{" "}
                                <span className="dashboard-song-artist">
                                    {song.artist}
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <div
                className="dashboard-text-container"
                style={{ marginBottom: "-55px" }}
            >
                <h2>Artists</h2>
                <p>Newest artists to listen to</p>
            </div>
            {loadingUsers ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "7rem",
                    }}
                >
                    <CircularProgress style={{ color: "orange" }} />
                </Box>
            ) : (
                <Swiper
                    breakpoints={{
                        // when window width is >= 280px
                        280: {
                            width: 280,
                            slidesPerView: 1,
                        },
                        // when window width is >= 640px
                        640: {
                            width: 640,
                            slidesPerView: 2,
                        },
                        // when window width is >= 768px
                        768: {
                            width: 768,
                            slidesPerView: 3,
                        },
                        1125: {
                            width: 1125,
                            slidesPerView: 4,
                        },
                    }}
                    modules={[Navigation]}
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation
                    className="swiper-users"
                >
                    {users.map((user) => (
                        <SwiperSlide
                            key={user.id}
                            className="swiper-slide-user"
                        >
                            <Avatar
                                name={user.username}
                                onClick={(event) => {
                                    handleUserClick(event)
                                }}
                                style={{
                                    marginTop: "55px",
                                    cursor: "pointer",
                                    backgroundColor: "var(--dark)",
                                    width: "10rem",
                                    height: "10rem",
                                    fontSize: "2.5rem",
                                }}
                            >
                                {user.username[0].toUpperCase()}
                            </Avatar>
                            <div className="dashboard-user-username">
                                {user.username}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}

export default Dashboard2
