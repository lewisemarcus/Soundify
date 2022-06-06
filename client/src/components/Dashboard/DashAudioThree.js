import React, { useState, useEffect, useRef } from "react"
import DashAudioControlThree from "./DashAudioControlThree"
import DashBackDropThree from "./DashBackDropThree"
import "./styles/DashAudio.css"
import shuffleArray from "../../utils/helpers/shuffleArray"
import { Link } from "react-router-dom"
import Marquee from "react-fast-marquee"

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const DashAudioThree = ({
    tracks,
    songData,
    clickedGenre,
    genreClickCount,
    prevClickCount,
    getIndexThree,
    setCurrent,
    currentPlayer,
    setCurrentSong,
    getThree,
    isThreePlaying,
}) => {
    shuffleArray(tracks)
    let songTitle, songFilename, songYear, songGenre, songId, songLink

    // State
    const [trackIndex, setTrackIndex] = useState(0)
    const [isPlayingThree, setIsPlaying] = useState(false)
    const [genreBool, setGenreBool] = useState(false)

    const originalData = [...songData]

    const intervalRef = useRef()

    const isReady = useRef(false)

    const toPrevTrack = () => {
        setGenreBool(true)
        if (clickedGenre === "") {
            if (trackIndex - 1 < 0) {
                setTrackIndex(tracks.length - 1)
                if (getIndexThree !== undefined)
                    getIndexThree(tracks.length - 1)
            } else {
                setTrackIndex(trackIndex - 1)
                if (getIndexThree !== undefined) getIndexThree(trackIndex - 1)
            }
        } else {
            if (trackIndex - 1 < 0) {
                setTrackIndex(songData.length - 1)
                if (getIndexThree !== undefined)
                    getIndexThree(songData.length - 1)
            } else {
                setTrackIndex(trackIndex - 1)
                if (getIndexThree !== undefined) getIndexThree(trackIndex - 1)
            }
        }
    }

    const toNextTrack = () => {
        setGenreBool(true)
        if (clickedGenre === "") {
            if (trackIndex < tracks.length - 1) {
                setTrackIndex(trackIndex + 1)
                if (getIndexThree !== undefined) getIndexThree(trackIndex + 1)
            } else {
                setTrackIndex(0)
                if (getIndexThree !== undefined) getIndexThree(0)
            }
        } else {
            if (trackIndex < songData.length - 1) {
                setTrackIndex(trackIndex + 1)
                if (getIndexThree !== undefined) getIndexThree(trackIndex + 1)
            } else {
                setTrackIndex(0)
                if (getIndexThree !== undefined) getIndexThree(0)
            }
        }
    }

    const [songInfo, setSongInfo] = useState(tracks[trackIndex])
    useEffect(() => {
        if (isPlayingThree) {
            document.getElementById("three").setAttribute("name", songInfo.link)
            setCurrent(document.getElementById("three"))

            setCurrentSong(songInfo.link)
        }
    }, [isPlayingThree, songInfo.link])

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        if (genreClickCount > prevClickCount) {
            setIsPlaying(false)
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

        currentPlayer.current.src = songLink

        if (isReady.current && genreBool) {
            setGenreBool(false)
            currentPlayer.current.play()
            setIsPlaying(true)
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true
        }
    }, [trackIndex, clickedGenre, genreClickCount])

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            currentPlayer.current.pause()
            clearInterval(intervalRef.current)
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
                <DashAudioControlThree
                    isThreePlaying={isThreePlaying}
                    getThree={getThree}
                    isPlaying={isPlayingThree}
                    genreBool={genreBool}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />

                <DashBackDropThree
                    isThreePlaying={isThreePlaying}
                    trackIndex={trackIndex}
                    // activeColor={color}
                    isPlaying={isPlayingThree}
                />
                <Link to={`/song/${songInfo._id}`}>
                    <button className="genre2">Go To Song</button>
                </Link>
            </div>
        </div>
    )
}

export default DashAudioThree
