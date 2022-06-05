import React, { useState, useEffect, useRef } from "react"
import DashAudioControlOne from "./DashAudioControlOne"
import DashBackDropOne from "./DashBackDropOne"
import "./styles/DashAudio.css"
import { Link } from "react-router-dom"
import Marquee from "react-fast-marquee"
import shuffleArray from "../../utils/helpers/shuffleArray"

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const DashAudioOne = ({
    tracks,
    songData,
    clickedGenre,
    genreClickCount,
    prevClickCount,
    setCurrentSong,
    getOne,
    getIndexOne,
    currentPlayer,
    setCurrent,
}) => {
    shuffleArray(tracks)
    let songTitle, songFilename, songYear, songGenre, songId, songLink

    // State
    const [trackIndex, setTrackIndex] = useState(0)
    const [isPlayingOne, setIsPlaying] = useState(false)
    const [genreBool, setGenreBool] = useState(false)

    const originalData = [...songData]

    const isReady = useRef(false)

    const toPrevTrack = () => {
        setIsPlaying(false)
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
        setIsPlaying(false)
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

    useEffect(() => {
        if (currentPlayer !== undefined)
            if (currentPlayer.current.paused && !isPlayingOne) {
                setIsPlaying(false)
                if (getOne !== undefined) getOne(false)
            }
    })

    const [songInfo, setSongInfo] = useState(tracks[trackIndex])
    useEffect(() => {
        if (currentPlayer !== undefined) {
            if (isPlayingOne) {
                document
                    .getElementById("one")
                    .setAttribute("name", songInfo.link)
                setCurrent(document.getElementById("one"))

                setCurrentSong(songInfo.link)
                if (getOne !== undefined) getOne(true)
            } else {
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
        if (currentPlayer !== undefined) {
            currentPlayer.current.pause()
            console.log(songLink)
            currentPlayer.current.src = songLink

            currentPlayer.current.load()

            if (isReady.current && genreBool) {
                setGenreBool(false)

                setIsPlaying(true)
                if (getOne !== undefined) getOne(true)
            } else {
                // Set the isReady ref as true for the next pass
                isReady.current = true
            }
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
            <div id={songInfo.link} className="track-information">
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
