import React, { useState, useEffect, useRef } from "react"
import DashAudioControls from "./DashAudioControls"
import DashBackDrop from "./DashBackDrop"
import "./styles/DashAudio.css"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded"
/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const DashAudio = ({ tracks, songData }) => {
    // State
    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(10)

    // Destructure for conciseness
    const { title, filename, year, genre, _id, link } = tracks[trackIndex]
    // const { title, artist, color, image, audioSrc } = tracks[trackIndex];
    // const [audioRef.current, setMusicLink] = useState(new Audio(link))
    // Refs
    const audioRef = useRef(new Audio(link))
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
            setIsPlaying(false)
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
    }, [trackIndex])

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause()
            clearInterval(intervalRef.current)
        }
    }, [])

    return (
        <div className="audio-play">
            <div className="track-information">
                {/* <img
          className="aw"
          // for future album covers
          // src={image}
          alt={`track artwork for ${title} by ${filename}`}
        /> */}
                <h2 className="songTitle">{title}</h2>
                <h3 className="songArtist">{filename}</h3>
                <br></br>
                <br></br>
                <DashAudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
                <input
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    // time={currentTime}
                    className="progress"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    style={{ background: trackStyling }}
                />
                {/* Volume slider */}
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{ mb: 0, mt: 2 }}
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
                                width: 16,
                                height: 16,
                                backgroundColor: "#fff",
                                "&:before": {
                                    boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
                                },
                                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                                    boxShadow: "none",
                                },
                            },
                        }}
                    />
                    <VolumeUpRounded />
                </Stack>
                <DashBackDrop
                    trackIndex={trackIndex}
                    // activeColor={color}
                    isPlaying={isPlaying}
                />
            </div>
        </div>
    )
}

export default DashAudio
