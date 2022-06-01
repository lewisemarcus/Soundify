import React, { useState, useEffect, useRef } from "react"
import AudioControls from "./AudioControls"
import Backdrop from "./Backdrop"
import "./styles/MusicPlayer.css"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded"

const AudioPlayer = ({ tracks, songData }) => {
    // State
    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.2)
    const originalData = [...songData]

    let songTitle, songFilename, songYear, songGenre, songId, songLink

    // Destructure for conciseness
    // const { title, artist, color, image, audioSrc } = tracks[trackIndex]

    // Refs
    const audioRef = useRef(new Audio(songLink))
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
            setIsPlaying(true)
        }
        startTimer()
    }

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1)
        } else {
            setTrackIndex(trackIndex - 1)
        }
    }

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1)
        } else {
            setTrackIndex(0)
        }
    }

    const onVolumeChange = (e) => {
        const { target } = e
        const newVolume = +target.value
        console.log(newVolume)
        if (newVolume) {
            setVolume(newVolume)
            audioRef.current.volume = newVolume || 0.01
        }
    }

    const [songInfo, setSongInfo] = useState(tracks[trackIndex])
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
        const { title, filename, year, genre, _id, link } =
                tracks[trackIndex]
            songTitle = title
            songFilename = filename
            songYear = year
            songGenre = genre
            songId = _id
            songLink = link
            setSongInfo(tracks[trackIndex])

        audioRef.current.pause()
        audioRef.current = new Audio(songLink)
        audioRef.current.load()

        setTrackProgress(audioRef.current.currentTime)
        if (isReady.current) {
            audioRef.current.play()
            setIsPlaying(true)
            startTimer()
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true
        }
    }, [trackIndex])

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

if (audioRef.current.currentTime === undefined) audioRef.current.currentTime = 0

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
sDisplay = s > 0 ? s + (s === 1 ? "" : "") : "00"

const endTime = `${hDisplay}${mDisplay}${sDisplay}`

    return (
        <div className="audio-player">
            <div className="track-info">
                {/* <img
                    className="artwork"
                    src={image}
                    alt={`track artwork for ${title} by ${artist}`}
                /> */}
                <h2 className="title">{songInfo.title}</h2>
                <h3 className="artist">{songInfo.artist}</h3>
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
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
                <div className="time">
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
            </div>
        </div>
    )
}

export default AudioPlayer
