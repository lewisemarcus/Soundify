import React, { useState, useEffect, useRef } from "react"
import DashAudioControlTwo from "./DashAudioControlTwo"
import DashBackDropTwo from "./DashBackDropTwo"
import "./styles/DashAudio.css"
import { Link } from "react-router-dom"
import Marquee from "react-fast-marquee"
import shuffleArray from "../../utils/helpers/shuffleArray"

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
    currentPlayer,
    setCurrentSong,
}) => {
    shuffleArray(tracks)
    let songTitle, songFilename, songYear, songGenre, songId, songLink

    // State
    const [trackIndex, setTrackIndex] = useState(0)

    const [isPlayingTwo, setIsPlaying] = useState(false)
    const [genreBool, setGenreBool] = useState(false)

    const originalData = [...songData]

    const isReady = useRef(false)

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
                getAudioTwo(currentPlayer.current)
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
                getAudioTwo(currentPlayer.current)
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

    useEffect(() => {
        if (currentPlayer.current.paused && !isPlayingTwo) {
            setIsPlaying(false)
            if (getTwo !== undefined) getTwo(false)
        }
    })

    const [songInfo, setSongInfo] = useState(tracks[trackIndex])
    useEffect(() => {
        if (isPlayingTwo) {
            document.getElementById("two").setAttribute("name", songInfo.link)
            setCurrent(document.getElementById("one"))

            setCurrentSong(songInfo.link)
        } else {
            currentPlayer.current.pause()

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

        currentPlayer.current.pause()
        currentPlayer.current.src = songLink

        currentPlayer.current.load()
        if (getAudioTwo !== undefined) {
            getAudioTwo(currentPlayer.current)
        }

        if (isReady.current && genreBool) {
            setGenreBool(false)

            setIsPlaying(true)
            if (getTwo !== undefined) getTwo(true)
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true
        }
    }, [trackIndex, clickedGenre, genreClickCount])

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            currentPlayer.current.pause()
        }
    }, [])

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
