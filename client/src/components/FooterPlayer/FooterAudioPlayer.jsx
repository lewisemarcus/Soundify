import React, { useState, useEffect, useRef } from "react"
import FooterAudioControls from "./FooterAudioControls"
import "./styles/FooterMusicPlayer.css"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded"
import { width } from "@mui/system"

const AudioPlayer = ({ tracks }) => {
    // State
    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(10)
    // const [style, setStyle] = useState({ display: 'none' });

    // Destructure for conciseness
    const { title, artist, audioSrc } = tracks[trackIndex]

    // Refs
    const audioRef = useRef(new Audio(audioSrc))
    const intervalRef = useRef()
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
        audioRef.current.pause()

        audioRef.current = new Audio(audioSrc)
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
    cmDisplay = cm > 0 ? cm + (cm === 1 ? ":" : ":") : "00:"
    csDisplay = cs > 0 ? cs + (cs === 1 ? "" : "") : "00"

    const displayTime = `${chDisplay}${cmDisplay}${csDisplay}`


    h = Math.floor(audioRef.current.duration / 3600)
    m = Math.floor((audioRef.current.duration % 3600) / 60)
    s = Math.floor((audioRef.current.duration % 3600) % 60)

    hDisplay = h > 0 ? h + (h === 1 ? ":" : ":") : ""
    mDisplay = m > 0 ? m + (m === 1 ? ":" : ":") : ""
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
                    volume
                />
                <div className="musicianTrack">
                    <h2 className="footer-title">{title}</h2>
                    <h3 className="footer-artist">{artist}</h3>
                </div>
                <div style={{ width: '5%' }}>{displayTime}</div>
                <input
                    type="range"
                    value={trackProgress}
                    max={duration ? duration : `${duration}`}
                    // time={currentTime}
                    className="footer-progress"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    style={{ width: '50%', background: trackStyling }}
                />
                <div style={{ width: '5%', display: 'flex', justifyContent: 'center' }}>{endTime}</div>
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
