import React, { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import FooterAudioControls from "./FooterAudioControls"
import "./styles/FooterMusicPlayer.css"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded"
import Marquee from "react-fast-marquee"
let count = 0
const AudioPlayer = ({
    currentSong,
    oneSongClick,
    genreClickCount,
    prevCount,
    currentPlayer,
    isPlaying,
    setIsPlaying,
    songInfo,
    trackIndex,
    getTrackIndex,
    trackProgress,
    setTrackProgress,
    singlePL,
    setCurrentSong,
    getSongInfo,
}) => {
    // State
    const location = useLocation()

    const [volume, setVolume] = useState(0.2)
    const [song, setSong] = useState({ title: "", artist: "" })
    // Destructure for conciseness
    useEffect(() => {}, [])

    // Refs
    let audioRef = currentPlayer

    const isReady = useRef(false)
    const intervalRef = useRef()

    const [duration, setDuration] = useState(0)
    const [trackStyle, setTrackStyle] = useState(`
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${0}, #fff), color-stop(${0}, #777))`)
    const [currentPercent, setCurrentPercent] = useState(0)

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            if (audioRef) {
                if (audioRef.current && audioRef.current.ended) toNextTrack()
                else if (audioRef.ended) toNextTrack()
                else {
                    if (audioRef.current)
                        setTrackProgress(audioRef.current.currentTime)
                    else setTrackProgress(audioRef.currentTime)
                }
            }
        }, [100])
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
            getTrackIndex(singlePL.songs.length - 1)
        } else {
            getTrackIndex(trackIndex - 1)
        }
    }

    const toNextTrack = () => {
        if (trackIndex < singlePL.songs.length - 1) {
            getTrackIndex(trackIndex + 1)
        } else {
            getTrackIndex(0)
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
        if (genreClickCount > prevCount) {
            audioRef.current.pause()
        }
    }, [genreClickCount, prevCount, currentSong])

    // Handles cleanup and setup when changing tracks

    useEffect(() => {
        if (location.pathname.split("/")[1] !== "") count++
        if (location.pathname.split("/")[1] !== "song") {
            if (audioRef.current !== undefined) {
                if (genreClickCount > prevCount) {
                    audioRef.current.pause()
                }

                if (isReady.current && !isPlaying && count < 1) {
                    count++
                } else {
                    // Set the isReady ref as true for the next pass
                    isReady.current = true
                }

                if (isPlaying) {
                    startTimer()
                }
            }
        } else {
            if (audioRef.current) {
                if (audioRef.current.src !== currentSong && currentSong) {
                    audioRef.current.src = currentSong
                }
                if (isReady.current && !isPlaying && count < 1) {
                    count++
                } else {
                    // Set the isReady ref as true for the next pass
                    isReady.current = true
                }
                if (isPlaying) {
                    startTimer()
                }
            }
        }
    }, [isPlaying, genreClickCount, currentSong])

    useEffect(() => {
        if (audioRef && audioRef.current) {
            audioRef.current.volume = volume
            // Destructure for conciseness
            setDuration(audioRef.current.duration)

            setCurrentPercent(
                duration ? `${(trackProgress / duration) * 100}%` : "0%",
            )
            setTrackStyle(`
            -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercent}, #fff), color-stop(${currentPercent}, #777))`)

            setTrackProgress(audioRef.current.currentTime)
        }
    }, [trackIndex, oneSongClick, location.pathname, trackProgress])

    useEffect(() => {
        if (singlePL.length !== 0) {
            setCurrentSong(singlePL.songs[trackIndex].link)
            getSongInfo({
                title: singlePL.songs[trackIndex].title,
                artist: singlePL.songs[trackIndex].artist,
            })
        }
    }, [trackIndex])

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            if (audioRef.current) audioRef.current.pause()
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
    if (audioRef.current) {
        if (audioRef.current.currentTime === undefined)
            audioRef.current.currentTime = 0

        ch = Math.floor(audioRef.current.currentTime / 3600)
        cm = Math.floor((audioRef.current.currentTime % 3600) / 60)
        cs = Math.floor((audioRef.current.currentTime % 3600) % 60)

        chDisplay = ch > 0 ? ch + (ch === 1 ? ":" : ":") : ""
        cmDisplay = cm > 0 ? cm + (cm === 1 ? ":" : ":") : "0:"
        csDisplay = cs < 10 ? "0" + cs : cs

        h = Math.floor(audioRef.current.duration / 3600)
        m = Math.floor((audioRef.current.duration % 3600) / 60)
        s = Math.floor((audioRef.current.duration % 3600) % 60)

        hDisplay = h > 0 ? h + (h === 1 ? ":" : ":") : ""
        mDisplay = m > 0 ? m + (m === 1 ? ":" : ":") : "0:"
        sDisplay = s > 0 ? s + (s === 1 ? "" : "") : "00"
    }

    const displayTime = `${chDisplay}${cmDisplay}${csDisplay}`

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
                    {songInfo.title && songInfo.title.length > 6 ? (
                        <Marquee
                            style={{ paddingTop: "5px" }}
                            gradient={false}
                            delay={2}
                        >
                            <h2
                                className="footer-title"
                                style={{ color: "white" }}
                            >
                                {songInfo.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </h2>
                        </Marquee>
                    ) : (
                        <h2
                            className="footer-title"
                            style={{ color: "white", paddingTop: "5px" }}
                        >
                            {songInfo.title}
                        </h2>
                    )}

                    {songInfo.artist && songInfo.artist.length > 8 ? (
                        <Marquee
                            gradient={false}
                            delay={2}
                            style={{ marginTop: "-5px" }}
                        >
                            <h3
                                className="footer-artist"
                                style={{ color: "white" }}
                            >
                                {songInfo.artist}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </h3>
                        </Marquee>
                    ) : (
                        <h3
                            className="footer-artist"
                            style={{ color: "white", marginTop: "-5px" }}
                        >
                            {songInfo.artist}
                        </h3>
                    )}
                </div>
                <div id="startFooterTimer">{displayTime}</div>
                <input
                    type="range"
                    value={trackProgress}
                    max={duration ? duration : `${duration}`}
                    className="footer-progress"
                    id="footerTimerBar"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    style={{ background: trackStyle }}
                />
                <div id="endFooterTimer">{endTime}</div>
            </div>
            {/* Volume slider */}
            <div className="volContainer">
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{ mb: 0, px: 1 }}
                    alignItems="center"
                >
                    <VolumeDownRounded />
                    <Slider
                        onChange={onVolumeChange}
                        aria-label="Volume"
                        defaultValue={0.25}
                        max={1}
                        min={0.01}
                        step={0.01}
                        sx={{
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
