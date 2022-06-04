import React, { useState, useEffect, useRef } from "react"
import DashAudioControlOne from "./DashAudioControlOne"
import DashBackDropOne from "./DashBackDropOne"
import "./styles/DashAudio.css"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded"
import { Link } from "react-router-dom"
import Marquee from "react-fast-marquee"
import shuffleArray from "../../utils/helpers/shuffleArray"

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const DashAudioOne = ({
    setCurrent,
    tracks,
    songData,
    clickedGenre,
    genreClickCount,
    prevClickCount,
    getAudioOne,
    getOne,
    getIndexOne,
    currentPlayer,
}) => {
    shuffleArray(tracks)
    let songTitle, songFilename, songYear, songGenre, songId, songLink
    const audioRef = currentPlayer
    // State
    const [trackIndex, setTrackIndex] = useState(0)
    const [trackProgress, setTrackProgress] = useState(0)
    const [isPlayingOne, setIsPlaying] = useState(false)
    const [genreBool, setGenreBool] = useState(false)
    const [volume, setVolume] = useState(0.2)
    const firstSong = new Audio(tracks[0].link)
    let firstDur
    firstSong.addEventListener("loadedmetadata", (event) => {
        firstDur = event.target.duration
    })
    const [songDur, getSongDur] = useState(firstDur)

    const originalData = [...songData]

    const intervalRef = useRef()
    if (audioRef !== undefined && audioRef.current !== undefined)
        audioRef.current.volume = volume
    const isReady = useRef(false)
    let duration
    // Destructure for conciseness
    if (audioRef !== undefined) duration = audioRef.current.duration
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
        if (!isPlayingOne) {
            setIsPlaying(false)
            if (getOne !== undefined) getOne(false)
        }
        startTimer()
    }

    const toPrevTrack = () => {
        setGenreBool(true)
        if (clickedGenre === "") {
            if (trackIndex - 1 < 0) {
                setTrackIndex(tracks.length - 1)
                if (getIndexOne !== undefined) getIndexOne(tracks.length - 1)
            } else {
                setTrackIndex(trackIndex - 1)
                if (getIndexOne !== undefined) getIndexOne(trackIndex - 1)
            }
        } else {
            if (trackIndex - 1 < 0) {
                setTrackIndex(songData.length - 1)
                if (getIndexOne !== undefined) getIndexOne(songData.length - 1)
            } else {
                setTrackIndex(trackIndex - 1)
                if (getIndexOne !== undefined) getIndexOne(trackIndex - 1)
            }
        }
    }

    const toNextTrack = () => {
        setGenreBool(true)
        if (clickedGenre === "") {
            if (trackIndex < tracks.length - 1) {
                setTrackIndex(trackIndex + 1)
                if (getIndexOne !== undefined) getIndexOne(trackIndex + 1)
            } else {
                setTrackIndex(0)
                if (getIndexOne !== undefined) getIndexOne(0)
            }
        } else {
            if (trackIndex < songData.length - 1) {
                setTrackIndex(trackIndex + 1)
                if (getIndexOne !== undefined) getIndexOne(trackIndex + 1)
            } else {
                setTrackIndex(0)
                if (getIndexOne !== undefined) getIndexOne(0)
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
        if (audioRef !== undefined)
            if (audioRef.current.paused) {
                setIsPlaying(false)
                if (getOne !== undefined) getOne(false)
            }
    })

    const [songInfo, setSongInfo] = useState(tracks[trackIndex])
    useEffect(() => {
        if (audioRef !== undefined) {
            if (isPlayingOne) {
                audioRef.current.play()
                startTimer()
                setIsPlaying(true)
                setCurrent(audioRef.current)
                if (getOne !== undefined) getOne(true)
            } else {
                audioRef.current.pause()
                setIsPlaying(false)
                if (getOne !== undefined) getOne(false)
            }
        }
    }, [isPlayingOne])

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        if (genreClickCount > prevClickCount) {
            setIsPlaying(false)
            if (getOne !== undefined) getOne(false)
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
        if (audioRef !== undefined) {
            audioRef.current.pause()
            audioRef.current.src = songLink
            audioRef.current.addEventListener("loadedmetadata", (event) => {
                getSongDur(event.target.duration)
            })
            audioRef.current.load()
            if (getAudioOne !== undefined) {
                getAudioOne(audioRef.current)
            }

            setTrackProgress(audioRef.current.currentTime)
            if (isReady.current && genreBool) {
                setGenreBool(false)

                audioRef.current.play()
                setIsPlaying(true)
                if (getOne !== undefined) getOne(true)

                startTimer()
            } else {
                // Set the isReady ref as true for the next pass
                isReady.current = true
            }
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
    if (audioRef !== undefined) {
        if (audioRef.current.currentTime === undefined)
            audioRef.current.currentTime = 0

        ch = Math.floor(audioRef.current.currentTime / 3600)
        cm = Math.floor((audioRef.current.currentTime % 3600) / 60)
        cs = Math.floor((audioRef.current.currentTime % 3600) % 60)

        chDisplay = ch > 0 ? ch + (ch === 1 ? ":" : ":") : ""
        cmDisplay = cm > 0 ? cm + (cm === 1 ? ":" : ":") : "0:"
        csDisplay = cs < 10 ? "0" + cs : cs

        h = Math.floor(songDur / 3600)
        m = Math.floor((songDur % 3600) / 60)
        s = Math.floor((songDur % 3600) % 60)

        hDisplay = h > 0 ? h + (h === 1 ? ":" : ":") : ""
        mDisplay = m > 0 ? m + (m === 1 ? ":" : ":") : "0:"
        sDisplay = s < 10 ? "0" + s : s
    }

    const displayTime = `${chDisplay}${cmDisplay}${csDisplay}`

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
                <DashAudioControlOne
                    isPlaying={isPlayingOne}
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
                <DashBackDropOne
                    trackIndex={trackIndex}
                    // activeColor={color}
                    isPlaying={isPlayingOne}
                />
                <Link to={`/song/${songInfo._id}`}>
                    <button className="genre2">Go To Song</button>
                </Link>
            </div>
        </div>
    )
}

export default DashAudioOne
