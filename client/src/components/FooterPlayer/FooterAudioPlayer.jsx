import React, { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import FooterAudioControls from "./FooterAudioControls"
import "./styles/FooterMusicPlayer.css"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded"
import { width } from "@mui/system"

const AudioPlayer = ({
    tracks,
    currentSong,
    oneSongClick,
    setOneSongClick,
    audioR,
    genreClickCount,
}) => {
    // State
    const location = useLocation()
    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.2)
    // const [style, setStyle] = useState({ display: 'none' });

    // Destructure for conciseness
    const { title, artist, audioSrc } = tracks[trackIndex]

    // Refs
    let audioRef = useRef(new Audio(currentSong))

    if (audioR && audioR.current) audioRef = audioR
    else if (currentSong && !audioR) audioRef.current.src = currentSong

    // else audioRef = useRef(new Audio(audioSrc))
    const intervalRef = useRef()
    audioRef.current.volume = volume
    const isReady = useRef(false)

    // Destructure for conciseness
    const { duration } = audioRef.current

    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%"
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            if (audioRef.current && audioRef.current.ended) {
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

        if (newVolume) {
            setVolume(newVolume)
            audioRef.current.volume = newVolume || 0.01
        }
    }

    useEffect(() => {
        if (location.pathname.split("/")[1] !== "song") {
            if (audioR && audioRef.current.src !== audioR.src)
                audioRef.current = audioR
            if (isPlaying) {
                audioRef.current.play()
                startTimer()
            } else {
                audioRef.current.pause()
            }
        }
    }, [isPlaying, location.pathname])

    useEffect(() => {
        isReady.current = false
    }, [genreClickCount])

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        if (audioR && audioR.current) audioRef = audioR
        else if (!audioR && currentSong)
            audioRef.current = new Audio(currentSong)
        audioRef.current.load()
        setOneSongClick(false)
    }, [oneSongClick, currentSong, audioR])

    useEffect(() => {
        if (audioR) audioR.src = currentSong
    }, [currentSong])
    useEffect(() => {
        if (!audioRef.current.paused) audioRef.current.pause()
        if (audioR && audioR.current) audioRef.current = audioR.current
        else if (audioR && !audioR.current) audioRef.current = audioR
        else if (!audioR && currentSong)
            audioRef.current = new Audio(currentSong)
        setTrackProgress(audioRef.current.currentTime)
        if (isReady.current) {
            console.log("reasons")
            audioRef.current.play()
            setIsPlaying(true)
            // isReady.current = false
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true
        }
    }, [trackIndex, oneSongClick, currentSong, audioR])

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
    sDisplay = s > 0 ? s + (s === 1 ? "" : "") : "00"

    const endTime = `${hDisplay}${mDisplay}${sDisplay}`

    return (
        <div className="footer-audio-player">
            <div className="footer-track-info">
                <FooterAudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
                <div className="musicianTrack">
                    <h2 className="footer-title">{title}</h2>
                    <h3 className="footer-artist">{artist}</h3>
                </div>
                <div style={{ width: "5%" }}>{displayTime}</div>
                <input
                    type="range"
                    value={trackProgress}
                    max={duration ? duration : `${duration}`}
                    // time={currentTime}
                    className="footer-progress"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    style={{ width: "50%", background: trackStyling }}
                />
                <div
                    style={{
                        width: "5%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {endTime}
                </div>
            </div>
            {/* Volume slider */}
            <div className="volContainer">
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{ mb: 1, px: 1 }}
                    alignItems="center"
                >
                    <VolumeDownRounded />
                    <Slider
                        onChange={onVolumeChange}
                        aria-label="Volume"
                        defaultValue={0.25}
                        max={1}
                        min={0.1}
                        step={0.01}
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
            </div>
        </div>
    )
}

export default AudioPlayer
