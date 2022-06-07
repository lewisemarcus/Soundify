import {
    LandingPage,
    Register,
    Login,
    AddSong,
    SongList,
    Playlists,
} from "./pages"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import SongDetails from "./pages/SongDetails"
import { AuthContext } from "./context/authContext"
import { useContext, useEffect, useState, useRef } from "react"
import Footer from "./components/Footer"
import DashResults from "./components/Dashboard/DashResults"

//instead of strictly a song Object, make it a song list
//Determine if the length of list < 1, treat as single song
//Else track song's index here and set current to current song index
function App() {
    const [genreClickCount, setGenreClickCount] = useState(0)
    const currentPlayer = useRef(null)
    const [prevCount, setPrevCount] = useState(0)
    const [songInfo, getSongInfo] = useState({
        title: "",
        artist: "",
    })
    const [audioR, setAudioR] = useState(null)
    const [oneSongClick, setOneSongClick] = useState(false)
    const [audioList, setAudioList] = useState([])
    const [currentSong, setCurrentSong] = useState(null)
    const [trackIndex, getTrackIndex] = useState(0)
    const location = useLocation()
    const [currentEvent, setCurrent] = useState()
    const [isPlaying, setIsPlaying] = useState(false)
    const [dashSearchResults, setDashSearchResults] = useState()
    const [isOnePlaying, getOne] = useState(false)
    const [isTwoPlaying, getTwo] = useState(false)
    const [isThreePlaying, getThree] = useState(false)
    const [footerId, setFooterId] = useState("")
    const { user } = useContext(AuthContext)
    let dashes = []

    useEffect(() => {
        if (currentPlayer.current.src !== "")
            if (isOnePlaying || isTwoPlaying || isThreePlaying || isPlaying) {
                currentPlayer.current.play()
            }
        getOne(false)
        getTwo(false)
        getThree(false)
        setIsPlaying(false)
        if (currentEvent)
            switch (currentEvent.id) {
                case "one":
                    getOne(true)
                    setIsPlaying(true)
                    break
                case "two":
                    setIsPlaying(true)
                    getTwo(true)
                    break
                case "three":
                    setIsPlaying(true)
                    getThree(true)
                    break
            }
    }, [currentEvent, currentSong])

    useEffect(() => {
        if (currentEvent !== undefined) {
            if (isOnePlaying) {
                setIsPlaying(true)
                getTwo(false)
                getThree(false)
            }
            if (isTwoPlaying) {
                setIsPlaying(true)
                getOne(false)
                getThree(false)
            }
            if (isThreePlaying) {
                setIsPlaying(true)
                getOne(false)
                getTwo(false)
            }
            if (!isOnePlaying && !isTwoPlaying && !isThreePlaying) {
                setIsPlaying(false)
                getOne(false)
                getTwo(false)
                getThree(false)
            }
        }
    }, [isOnePlaying, isTwoPlaying, isThreePlaying])

    useEffect(() => {
        //debugger
        if (currentEvent !== undefined) {
            setFooterId(currentEvent.id)
            if (isPlaying) {
                if (currentEvent.id === "one") {
                    getOne(true)
                    getTwo(false)
                    getThree(false)
                }
                if (currentEvent.id === "two") {
                    getOne(false)
                    getTwo(true)
                    getThree(false)
                }
                if (currentEvent.id === "three") {
                    getTwo(false)
                    getOne(false)
                    getThree(true)
                }
            } else {
                getOne(false)
                getTwo(false)
                getThree(false)
            }
        }

        if (isPlaying) currentPlayer.current.play()
        if (!isPlaying) currentPlayer.current.pause()
    }, [isPlaying])
    return (
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <LandingPage
                            currentEvent={currentEvent}
                            getSongInfo={getSongInfo}
                            getTrackIndex={getTrackIndex}
                            setCurrent={setCurrent}
                            currentSong={currentSong}
                            isOnePlaying={isOnePlaying}
                            getOne={getOne}
                            isTwoPlaying={isTwoPlaying}
                            getTwo={getTwo}
                            isThreePlaying={isThreePlaying}
                            getThree={getThree}
                            currentPlayer={currentPlayer}
                            setPrevCount={setPrevCount}
                            setAudioList={setAudioList}
                            genreClickCount={genreClickCount}
                            setGenreClickCount={setGenreClickCount}
                            setAudioR={setAudioR}
                            setCurrentSong={setCurrentSong}
                            setDashSearchResults={setDashSearchResults}
                        />
                    }
                />
                <Route
                    path="/DashResults"
                    element={
                        <DashResults
                            setIsPlaying={setIsPlaying}
                            currentPlayer={currentPlayer}
                            dashSearchResults={dashSearchResults}
                            setOneSongClick={setOneSongClick}
                            setCurrentSong={setCurrentSong}
                        />
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/upload" element={<AddSong />} /> */}
                <Route
                    path="/songs"
                    element={user ? <SongList /> : <Navigate to="/" />}
                />
                <Route
                    path="/song/:songId"
                    element={
                        <SongDetails
                            getSongInfo={getSongInfo}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            currentPlayer={currentPlayer}
                            setCurrentSong={setCurrentSong}
                        />
                    }
                />
                <Route
                    path="/playlists"
                    element={
                        user ? (
                            <Playlists
                                currentPlayer={currentPlayer}
                                setCurrentSong={setCurrentSong}
                            />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>

            {user && (
                <Footer
                    songInfo={songInfo}
                    getTrackIndex={getTrackIndex}
                    trackIndex={trackIndex}
                    footerId={footerId}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    isOnePlaying={isOnePlaying}
                    isTwoPlaying={isTwoPlaying}
                    isThreePlaying={isThreePlaying}
                    currentPlayer={currentPlayer}
                    genreClickCount={genreClickCount}
                    prevCount={prevCount}
                    audioR={audioR}
                    currentSong={currentSong}
                    oneSongClick={oneSongClick}
                    setOneSongClick={setOneSongClick}
                />
            )}
            <audio
                id="audio-element"
                crossOrigin="anonymous"
                ref={currentPlayer}
                src={currentSong}
            ></audio>
        </div>
    )
}

export default App
