import React, { useState, useEffect, useRef } from "react"
import AudioControls from "./AudioControls"
import Backdrop from "./Backdrop"
import "./styles/MusicPlayer.css"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded"
import { Link } from "react-router-dom"
const AudioPlayer = ({
    singlePL,
    playlistSong,
    setSelectedSong,
    selectedSong,
    newTitle,
    r,
    setR,
    currentPlayer,
}) => {
    // State

    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.2)
    let title, artist, link, _id
    // Destructure for conciseness
    if (singlePL.songs && singlePL.songs[trackIndex]) {
        title = singlePL.songs[trackIndex].title
        artist = singlePL.songs[trackIndex].artist
        link = singlePL.songs[trackIndex].link
        _id = singlePL.songs[trackIndex]._id
    }

    const [song, setSong] = useState({
        title: title,
        artist: artist,
        link: link,
        _id: _id,
    })
    useEffect(() => {
        if (singlePL.songs) setSong(singlePL.songs[trackIndex])
    }, [trackIndex])

    // Refs
    const audioRef = useRef(new Audio(link))
    const intervalRef = useRef()
    audioRef.current.volume = volume
    const isReady = useRef(false)

    // Destructure for conciseness
    const { duration } = audioRef.current

    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%"
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack()
            } else {
                setTrackProgress(audioRef.current.currentTime)
            }
        }, [1000])
    }

    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current)
        audioRef.current.currentTime = value
        setTrackProgress(audioRef.current.currentTime)
    }

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(false)
        }
        startTimer()
    }

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(singlePL.songs.length - 1)
            let find = document.querySelectorAll(".active")
            find.forEach((find) => {
                find.classList.remove("active")
            })
            let row = document.querySelectorAll("button[title]")
            let r
            r = row[row.length - 1]
            row = r.parentNode

            row.classList.add("active")
        } else {
            setTrackIndex(trackIndex - 1)
            let find = document.querySelectorAll(".active")
            find.forEach((find) => {
                find.classList.remove("active")
            })
            let row = document.querySelectorAll("button[title]")
            let btnTitle = song.title
            let r
            for (r = 0; r < row.length; r++) {
                if (row[r].title === btnTitle) {
                    break
                }
            }
            r--
            row = row[r].parentNode
            row.classList.add("active")
            r = 0
        }
    }

    const toNextTrack = () => {
        if (trackIndex < singlePL.songs.length - 1) {
            setTrackIndex(trackIndex + 1)
            let find = document.querySelectorAll(".active")
            find.forEach((find) => {
                find.classList.remove("active")
            })
            let row = document.querySelectorAll("button[title]")
            let btnTitle = song.title
            let r
            for (r = 0; r < row.length; r++) {
                if (row[r].title === btnTitle) {
                    break
                }
            }
            r++
            row = row[r].parentNode
            row.classList.add("active")
            r = 0
        } else {
            setTrackIndex(0)
            let find = document.querySelectorAll(".active")
            find.forEach((find) => {
                find.classList.remove("active")
            })
            let row = document.querySelectorAll("button[title]")
            let r
            r = row[0]
            row = r.parentNode
            row.classList.add("active")
        }
    }

    const onVolumeChange = (e) => {
        const { target } = e
        const newVolume = +target.value

        if (newVolume) {
            setVolume(newVolume)
            audioRef.current.volume = newVolume || 0.01
        }
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play()
            startTimer()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        if (newTitle !== undefined && r !== false) {
            for (let i = 0; i < singlePL.songs.length; i++) {
                if (singlePL.songs[i].title === newTitle.value) {
                    setTrackIndex(i)
                    break
                }
            }
            setR(false)
        }
    })
    useEffect(() => {
        audioRef.current.pause()
        audioRef.current = new Audio(link)
        audioRef.current.play()
        setSelectedSong(false)
    }, [selectedSong, playlistSong, link, trackIndex])

    useEffect(() => {
        if (!audioRef.current.paused) audioRef.current.pause()
        audioRef.current = new Audio(link)

        setTrackProgress(audioRef.current.currentTime)
        if (isReady.current) {
            audioRef.current.play()
            setIsPlaying(true)
            startTimer()
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true
        }
    }, [trackIndex, link])

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause()
            clearInterval(intervalRef.current)
        }
    }, [])

    let h,
        m,
        s,
        hDisplay,
        mDisplay,
        sDisplay,
        ch,
        cm,
        cs,
        chDisplay,
        cmDisplay,
        csDisplay

    if (audioRef.current.currentTime === undefined)
        audioRef.current.currentTime = 0

    ch = Math.floor(audioRef.current.currentTime / 3600)
    cm = Math.floor((audioRef.current.currentTime % 3600) / 60)
    cs = Math.floor((audioRef.current.currentTime % 3600) % 60)

    chDisplay = ch > 0 ? ch + (ch === 1 ? ":" : ":") : ""
    cmDisplay = cm > 0 ? cm + (cm === 1 ? ":" : ":") : "0:"
    csDisplay = cs < 10 ? "0" + cs : cs

    const displayTime = `${chDisplay}${cmDisplay}${csDisplay}`

    h = Math.floor(audioRef.current.duration / 3600)
    m = Math.floor((audioRef.current.duration % 3600) / 60)
    s = Math.floor((audioRef.current.duration % 3600) % 60)

    hDisplay = h > 0 ? h + (h === 1 ? ":" : ":") : ""
    mDisplay = m > 0 ? m + (m === 1 ? ":" : ":") : "0:"
    sDisplay = s < 10 ? "0" + s : s

    const endTime = `${hDisplay}${mDisplay}${sDisplay}`
    if (currentPlayer.current) currentPlayer.current.src = audioRef.current.src

    return (
        <div className="audio-player">
            <div className="track-info">
                <h2 className="title">{song.title}</h2>
                <h3 className="artist">{song.artist}</h3>
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
                <div className="time">
                    <input
                        type="range"
                        value={trackProgress}
                        max={duration ? duration : `${duration}`}
                        // time={currentTime}
                        className="progress"
                        onChange={(e) => onScrub(e.target.value)}
                        onMouseUp={onScrubEnd}
                        onKeyUp={onScrubEnd}
                        style={{ background: trackStyling }}
                    />
                    <div>{displayTime}</div>
                    <div>{endTime}</div>
                </div>
                {/* Volume slider */}
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{ mb: 0, px: 2 }}
                    alignItems="center"
                >
                    <VolumeDownRounded />
                    <Slider
                        onChange={onVolumeChange}
                        aria-label="Volume"
                        defaultValue={0.2}
                        max={1}
                        min={0.01}
                        step={0.01}
                        // value={volume}
                        sx={{
                            // color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                            "& .MuiSlider-track": {
                                border: "none",
                            },
                            "& .MuiSlider-thumb": {
                                width: 24,
                                height: 24,
                                backgroundColor: "#fff",
                                "&:before": {
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                                },
                                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                                    boxShadow: "none",
                                },
                            },
                        }}
                    />
                    <VolumeUpRounded />
                </Stack>
                <Backdrop
                    trackIndex={trackIndex}
                    // activeColor={color}
                    isPlaying={isPlaying}
                />
                <Link to={`/song/${song._id}`}>
                    <button className="genre2">Go To Song</button>
                </Link>
            </div>
        </div>
    )
}

export default AudioPlayer
