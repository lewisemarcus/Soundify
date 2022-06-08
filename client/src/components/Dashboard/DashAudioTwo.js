import React, { useState, useEffect, useRef } from "react"
import DashAudioControlTwo from "./DashAudioControlTwo"
import DashBackDropTwo from "./DashBackDropTwo"
import "./styles/DashAudio.css"
import shuffleArray from "../../utils/helpers/shuffleArray"
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
    getIndexTwo,
    setCurrent,
    currentPlayer,
    setCurrentSong,
    getTwo,
    isTwoPlaying,
    getTrackIndex,
    getSongInfo,
    genreClicked,
}) => {
    useEffect(() => {
        shuffleArray(tracks)
    }, [])
    let songTitle, songFilename, songYear, songGenre, songId, songLink

    // State
    const [trackIndex, setTrackIndex] = useState(0)
    const [isPlayingTwo, setIsPlaying] = useState(false)
    const [genreBool, setGenreBool] = useState(false)
    const [songList, setSongList] = useState([{}])
    const originalData = [...songData]
    const [changed, setChanged] = useState(false)
    const intervalRef = useRef()

    const isReady = useRef(false)

    const toPrevTrack = () => {
        setGenreBool(true)
        setChanged(true)
        if (clickedGenre === "") {
            if (trackIndex - 1 < 0) {
                getTrackIndex(tracks.length - 1)
                setTrackIndex(tracks.length - 1)
                if (getIndexTwo !== undefined) getIndexTwo(tracks.length - 1)
            } else {
                getTrackIndex(trackIndex - 1)
                setTrackIndex(trackIndex - 1)
                if (getIndexTwo !== undefined) getIndexTwo(trackIndex - 1)
            }
        } else {
            if (trackIndex - 1 < 0) {
                getTrackIndex(songData.length - 1)
                setTrackIndex(songData.length - 1)
                if (getIndexTwo !== undefined) getIndexTwo(songData.length - 1)
            } else {
                getTrackIndex(trackIndex - 1)
                setTrackIndex(trackIndex - 1)
                if (getIndexTwo !== undefined) getIndexTwo(trackIndex - 1)
            }
        }
    }

    const toNextTrack = () => {
        setGenreBool(true)
        setChanged(true)
        if (clickedGenre === "") {
            if (trackIndex < tracks.length - 1) {
                getTrackIndex(trackIndex + 1)
                setTrackIndex(trackIndex + 1)
                if (getIndexTwo !== undefined) getIndexTwo(trackIndex + 1)
            } else {
                getTrackIndex(0)
                setTrackIndex(0)
                if (getIndexTwo !== undefined) getIndexTwo(0)
            }
        } else {
            if (trackIndex < songData.length - 1) {
                setTrackIndex(trackIndex + 1)
                getTrackIndex(trackIndex + 1)
                if (getIndexTwo !== undefined) getIndexTwo(trackIndex + 1)
            } else {
                getTrackIndex(0)
                setTrackIndex(0)
                if (getIndexTwo !== undefined) getIndexTwo(0)
            }
        }
    }

    const [songInfo, setSongInfo] = useState(tracks[trackIndex])
    useEffect(() => {
        if (isPlayingTwo) {
            document.getElementById("two").setAttribute("name", songInfo.link)
            setCurrent(document.getElementById("two"))

            setCurrentSong(songInfo.link)
        }
    }, [isPlayingTwo, songInfo.link])

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        console.log(changed)
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
            if (changed && isTwoPlaying) {
                currentPlayer.current.src = songLink
                getSongInfo(tracks[trackIndex])
            }
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
                setSongList(songData)
                setSongInfo(songData[trackIndex])
                if ((changed || genreClicked) && isTwoPlaying) {
                    currentPlayer.current.src = songLink
                    getSongInfo(songData[trackIndex])
                }
            }
        }

        if (isReady.current && genreBool) {
            setGenreBool(false)
            currentPlayer.current.play()
            setIsPlaying(true)
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true
        }
    }, [trackIndex, clickedGenre, genreClickCount, changed])

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
                <DashAudioControlTwo
                    getSongInfo={getSongInfo}
                    songInfo={songInfo}
                    setChanged={setChanged}
                    songList={songList}
                    songData={tracks}
                    setCurrent={setCurrent}
                    isTwoPlaying={isTwoPlaying}
                    getTwo={getTwo}
                    isPlaying={isPlayingTwo}
                    genreBool={genreBool}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />

                <DashBackDropTwo
                    isTwoPlaying={isTwoPlaying}
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
