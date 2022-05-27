import React, { useState, useEffect, useRef } from "react"
import FooterAudioControls from "./FooterAudioControls"
import "./styles/FooterMusicPlayer.css"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"

const AudioPlayer = ({ tracks }) => {
    // State
    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(10)
    const [style, setStyle] = useState({ display: 'none' });

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

    function preventHorizontalKeyboardNavigation(event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }
    }

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
                <h2 className="footer-title">{title}</h2>
                <h3 className="footer-artist">{artist}</h3>
                <input
                    type="range"
                    value={trackProgress}
                    max={duration ? duration : `${duration}`}
                    // time={currentTime}
                    className="footer-progress"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    style={{ background: trackStyling }}
                />
                {/* Volume slider */}
                <div className="volContainer">
                    <Stack
                        style={style}
                        spacing={2}
                        direction="row"
                        sx={{ height: 300 }}
                        alignItems="center"
                    >
                        {/* <VolumeDownRounded /> */}
                        <Slider
                            className="volSlider"
                            onChange={onVolumeChange}
                            aria-label="Volume"
                            defaultValue={0.25}
                            max={1}
                            min={0.1}
                            step={0.01}
                            // value={volume}
                            sx={{
                                '& input[type="range"]': {
                                    WebkitAppearance: 'slider-vertical',
                                },
                            }}
                            orientation="vertical"
                            onKeyDown={preventHorizontalKeyboardNavigation}
                        />
                    </Stack>
                    <VolumeUpRounded
                        className="volIcon"
                        onMouseEnter={e => {
                            setStyle({ display: 'flex', flexDirection: 'column' });
                        }}
                        onMouseLeave={e => {
                            setStyle({ display: 'none' })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AudioPlayer
