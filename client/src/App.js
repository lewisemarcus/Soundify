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

function App() {
    const [playlistClicked, setPlaylistClicked] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const [singlePL, setSinglePL] = useState([
        {
            title: "NO PLAYLISTS AVAILABLE",
            artist: "NO PLAYLISTS AVAILABLE",
            link: "NO PLAYLISTS AVAILABLE",
        },
    ])
    const [genreClickCount, setGenreClickCount] = useState(0)
    const currentPlayer = useRef(null)
    const [prevCount, setPrevCount] = useState(0)
    const [songInfo, getSongInfo] = useState({
        title: "",
        artist: "",
    })
    const [trackProgress, setTrackProgress] = useState(0)
    const [audioR, setAudioR] = useState(null)
    const [oneSongClick, setOneSongClick] = useState(false)
    const [audioList, setAudioList] = useState([])
    const [currentSong, setCurrentSong] = useState(null)
    const [trackIndex, getTrackIndex] = useState(0)
    const location = useLocation()
    const [currentEvent, setCurrent] = useState()
    const [isPlaying, setIsPlaying] = useState(false)
    const [dashSearchResults, setDashSearchResults] = useState()
    const [detailsPlaying, isDetailsPlaying] = useState(false)
    const [isOnePlaying, getOne] = useState(false)
    const [isTwoPlaying, getTwo] = useState(false)
    const [isThreePlaying, getThree] = useState(false)
    const [footerId, setFooterId] = useState("")
    const { user } = useContext(AuthContext)
    let dashes = []

    useEffect(() => {
        if (location.pathname.split("/")[1] !== "playlists")
            setPlaylistClicked(false)
        if (detailsPlaying) setIsPlaying(true)
    }, [detailsPlaying, location.pathname])
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
                {/* <Route path="/upload" element={<AddSong />} /> */}
                <Route
                    path="/songs"
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
                    path="/playlists"
                    element={
                        user ? (
                            <Playlists
                                playlistClicked={playlistClicked}
                                setPlaylistClicked={setPlaylistClicked}
                                playlists={playlists}
                                setPlaylists={setPlaylists}
                                singlePL={singlePL}
                                setSinglePL={setSinglePL}
                                currentPlayer={currentPlayer}
                                setCurrentSong={setCurrentSong}
                            />
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
