import {
    LandingPage,
    Register,
    Login,
    SongList,
    Playlists,
    UserPage,
} from "./pages"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import SongDetails from "./pages/SongDetails"
import { AuthContext } from "./context/authContext"
import { useContext, useEffect, useState, useRef } from "react"
import Footer from "./components/Footer"
import DashResults from "./components/Dashboard/DashResults"

function App() {
    const [genreClickCount, setGenreClickCount] = useState(0)
    const currentPlayer = useRef(new Audio())
    const [prevCount, setPrevCount] = useState(0)
    const [songInfo, getSongInfo] = useState({
        title: "",
        artist: "",
    })
    const [trackProgress, setTrackProgress] = useState(0)
    const [audioR, setAudioR] = useState(null)
    const [oneSongClick, setOneSongClick] = useState(false)
    const [currentSong, setCurrentSong] = useState(null)
    const [trackIndex, getTrackIndex] = useState(0)
    const location = useLocation()
    const [currentEvent, setCurrent] = useState()
    const [isPlaying, setIsPlaying] = useState(false)
    const [dashSearchResults, setDashSearchResults] = useState()
    const [detailsPlaying, isDetailsPlaying] = useState(false)
    const [footerId, setFooterId] = useState("")
    const { user } = useContext(AuthContext)
    let dashes = []

    useEffect(() => {
        if (detailsPlaying && location.pathname.split("/")[1] === "") {
            if (isPlaying) currentPlayer.current.play()
        }
    }, [detailsPlaying, location.pathname])
    useEffect(() => {
        if (currentPlayer.current.src !== "" && isPlaying) {
            const promise = currentPlayer.current.play()
            if (promise !== undefined) {
                promise.then((_) => {}).catch((err) => {})
            }
        }
    }, [currentEvent, currentSong, location.pathname])

    useEffect(() => {
        //debugger
        if (currentEvent !== undefined) {
            setFooterId(currentEvent.id)
        }
        if (isPlaying) currentPlayer.current.play()
        if (!isPlaying) currentPlayer.current.pause()
    }, [isPlaying])
    return (
        <div>
            <Navbar setDashSearchResults={setDashSearchResults} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <LandingPage
                            currentSong={currentSong}
                            setIsPlaying={setIsPlaying}
                            currentPlayer={currentPlayer}
                            getSongInfo={getSongInfo}
                            setCurrentSong={setCurrentSong}
                        />
                    }
                />
                <Route
                    path="/DashResults"
                    element={
                        <DashResults
                            getSongInfo={getSongInfo}
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

                <Route
                    path="/uploads"
                    element={user ? <SongList /> : <Navigate to="/" />}
                />
                <Route
                    path="/song/:songId"
                    element={
                        <SongDetails
                            setTrackProgress={setTrackProgress}
                            trackProgress={trackProgress}
                            isDetailsPlaying={isDetailsPlaying}
                            getSongInfo={getSongInfo}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            currentPlayer={currentPlayer}
                            setCurrentSong={setCurrentSong}
                        />
                    }
                />
                <Route
                    path="/user/:username"
                    element={user ? <UserPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/playlists"
                    element={
                        user ? (
                            <Playlists currentPlayer={currentPlayer} />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>

            {user && location.pathname.split("/")[1] !== "playlists" && (
                <Footer
                    trackProgress={trackProgress}
                    setTrackProgress={setTrackProgress}
                    songInfo={songInfo}
                    getTrackIndex={getTrackIndex}
                    trackIndex={trackIndex}
                    footerId={footerId}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentPlayer={currentPlayer}
                    genreClickCount={genreClickCount}
                    prevCount={prevCount}
                    audioR={audioR}
                    currentSong={currentSong}
                    oneSongClick={oneSongClick}
                    setOneSongClick={setOneSongClick}
                />
            )}
            <div>
                <div>
                    {" "}
                    <audio
                        id="audio-element"
                        crossOrigin="anonymous"
                        ref={currentPlayer}
                        src={currentSong}
                        allow="autoplay"
                    ></audio>
                </div>
            </div>
        </div>
    )
}

export default App
