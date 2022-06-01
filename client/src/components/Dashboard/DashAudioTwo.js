import React, { useState, useEffect, useRef } from "react"
import DashAudioControlTwo from "./DashAudioControlTwo"
import DashBackDropTwo from "./DashBackDropTwo"
import "./styles/DashAudio.css"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded"
import { Link } from "react-router-dom"
import Marquee from "react-fast-marquee"

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const DashAudioTwo = ({
    tracks,
    songData,
    clickedGenre,
    genreClickCount,
    prevClickCount,
    getTwo,
    getAudioTwo,
    getIndexTwo,
    setCurrent,
}) => {
    shuffleArray(tracks)
    let songTitle, songFilename, songYear, songGenre, songId, songLink
    const audioRef = useRef(new Audio(songLink))
    // State
    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlayingTwo, setIsPlaying] = useState(false)
    const [genreBool, setGenreBool] = useState(false)
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

    const originalData = [...songData]

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
        if (!isPlayingTwo) {
            setIsPlaying(false)
            if (getTwo !== undefined) getTwo(false)
        }
        startTimer()
    }

    const toPrevTrack = () => {
        setGenreBool(true)
        if (clickedGenre === "") {
            if (trackIndex - 1 < 0) {
                setTrackIndex(tracks.length - 1)
                if (getIndexTwo !== undefined) getIndexTwo(tracks.length - 1)
            } else {
                setTrackIndex(trackIndex - 1)
                if (getIndexTwo !== undefined) getIndexTwo(trackIndex - 1)
            }
            if (getAudioTwo !== undefined) {
                getAudioTwo(audioRef.current)
            }
        } else {
            if (trackIndex - 1 < 0) {
                setTrackIndex(songData.length - 1)
                if (getIndexTwo !== undefined) getIndexTwo(songData.length - 1)
            } else {
                setTrackIndex(trackIndex - 1)
                if (getIndexTwo !== undefined) getIndexTwo(trackIndex - 1)
            }
            if (getAudioTwo !== undefined) {
                getAudioTwo(audioRef.current)
            }
        }
    }

    const toNextTrack = () => {
        setGenreBool(true)
        if (clickedGenre === "") {
            if (trackIndex < tracks.length - 1) {
                setTrackIndex(trackIndex + 1)
                if (getIndexTwo !== undefined) getIndexTwo(trackIndex + 1)
            } else {
                setTrackIndex(0)
                if (getIndexTwo !== undefined) getIndexTwo(0)
            }
        } else {
            if (trackIndex < songData.length - 1) {
                setTrackIndex(trackIndex + 1)
                if (getIndexTwo !== undefined) getIndexTwo(trackIndex + 1)
            } else {
                setTrackIndex(0)
                if (getIndexTwo !== undefined) getIndexTwo(0)
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

    useEffect(() => {
        if (audioRef.current.paused) {
            setIsPlaying(false)
            if (getTwo !== undefined) getTwo(false)
        }
    })

    const [songInfo, setSongInfo] = useState(tracks[trackIndex])
    useEffect(() => {
        if (isPlayingTwo) {
            setCurrent(audioRef.current)
            audioRef.current.play()
            startTimer()
            setIsPlaying(true)
            if (getTwo !== undefined) getTwo(true)
        } else {
            audioRef.current.pause()
            setIsPlaying(false)
            if (getTwo !== undefined) getTwo(false)
        }
    }, [isPlayingTwo])

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        if (genreClickCount > prevClickCount) {
            setIsPlaying(false)
            if (getTwo !== undefined) getTwo(false)
        }
        if (clickedGenre === "") {
            // Destructure for conciseness
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
                // Destructure for conciseness
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
        if (getAudioTwo !== undefined) {
            getAudioTwo(audioRef.current)
        }

        setTrackProgress(audioRef.current.currentTime)
        if (isReady.current && genreBool) {
            setGenreBool(false)
            audioRef.current.play()
            setIsPlaying(true)
            if (getTwo !== undefined) getTwo(true)
            startTimer()
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true
        }
    }, [trackIndex, clickedGenre, genreClickCount])

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
        <div className="audio-play">
            <div className="track-information">
                {songInfo.title.length > 16 ? (
                    <Marquee gradient={false} delay={1}>
                        <h2 className="songTitle">
                            {songInfo.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </h2>
                    </Marquee>
                ) : (
                    <h2 className="songTitle">{songInfo.title}</h2>
                )}
                <h3 className="songArtist">{songInfo.artist}</h3>
                <br></br>
                <br></br>
                <DashAudioControlTwo
                    isPlaying={isPlayingTwo}
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
                        sx={{
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
                <DashBackDropTwo
                    trackIndex={trackIndex}
                    // activeColor={color}
                    isPlaying={isPlayingTwo}
                />
                <Link to={`/song/${songInfo._id}`}>
                    <button className="genre2">Go To Song</button>
                </Link>
            </div>
        </div>
    )
}

export default DashAudioTwo
