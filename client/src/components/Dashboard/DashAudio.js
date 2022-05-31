import React, { useState, useEffect, useRef } from "react"
import DashAudioControls from "./DashAudioControls"
import DashBackDrop from "./DashBackDrop"
import "./styles/DashAudio.css"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded"
import { Link } from "react-router-dom"
import Marquee from "react-fast-marquee";
let genreList = []
/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const DashAudio = ({ tracks, songData, clickedGenre }) => {
    
    genreList.push(clickedGenre)
    // State
    const [trackIndex, setTrackIndex] = useState(0)
    // const [clickedGenre, setClickedGenre] = useState(0)
    const [genreBool, setGenreBool] = useState(false)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.2)

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1))
            var temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }
    shuffleArray(tracks)
    const originalData = [...songData]

    let songTitle, songFilename, songYear, songGenre, songId, songLink

    // Destructure for conciseness

    // const { title, artist, color, image, audioSrc } = tracks[trackIndex];
    // const [audioRef.current, setMusicLink] = useState(new Audio(link))
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
            setIsPlaying(false)
        }
        startTimer()
    }

    const toPrevTrack = () => {
        setGenreBool(true)
        if (clickedGenre === "") {
            if (trackIndex - 1 < 0) {
                setTrackIndex(tracks.length - 1)
            } else {
                setTrackIndex(trackIndex - 1)
            }
        } else {
            if (trackIndex - 1 < 0) {
                setTrackIndex(songData.length - 1)
            } else {
                setTrackIndex(trackIndex - 1)
            }
        }
    }

    const toNextTrack = () => {
        setGenreBool(true)
        if (clickedGenre === "") {
            if (trackIndex < tracks.length - 1) {
                setTrackIndex(trackIndex + 1)
            } else {
                setTrackIndex(0)
            }
        } else {
            if (trackIndex < songData.length - 1) {
                setTrackIndex(trackIndex + 1)
            } else {
                setTrackIndex(0)
            }
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
        if (clickedGenre === "") {
            const { title, filename, year, genre, _id, link } =
                tracks[trackIndex]
            songTitle = title
            songFilename = filename
            songYear = year
            songGenre = genre
            songId = _id
            songLink = link
            setSongInfo(tracks[trackIndex])
        } else {
            if (songData[trackIndex] !== undefined) {
                setGenreBool(false)
                shuffleArray(songData)
                const { title, filename, year, genre, _id, link } =
                    songData[trackIndex]
                songTitle = title
                songFilename = filename
                songYear = year
                songGenre = genre
                songId = _id
                songLink = link
                setSongInfo(songData[trackIndex])
            }
        }

        audioRef.current.pause()
        audioRef.current = new Audio(songLink)
        audioRef.current.load()

        setTrackProgress(audioRef.current.currentTime)
        if (isReady.current && genreBool) {
            console.log(genreBool)
            setGenreBool(false)
            audioRef.current.play()
            setIsPlaying(true)
            startTimer()
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true
        }
    }, [trackIndex, clickedGenre])

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
        /> */}{" "}
                {songInfo.title.length > 25 ? (
                    <Marquee
                    gradient = {false}>
                        <Link to={`/song/${songInfo._id}`}>
                                <h2 className="songTitle">{songInfo.title}</h2>
                        </Link>
                    </Marquee>
                ): (
                    <Link to={`/song/${songInfo._id}`}>
                    <h2 className="songTitle">{songInfo.title}</h2>
                    </Link>
                )}
                    <h3 className="songArtist">{songInfo.artist}</h3>
                <br></br>
                <br></br>
                <DashAudioControls
                    isPlaying={isPlaying}
                    genreBool={genreBool}
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
