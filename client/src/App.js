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
    const [genreClickCount, setGenreClickCount] = useState(0)
    const currentPlayer = useRef(new Audio())
    const [prevCount, setPrevCount] = useState(0)
    const [audioR, setAudioR] = useState(null)
    const [oneSongClick, setOneSongClick] = useState(false)
    const [audioList, setAudioList] = useState([])
    const [currentSong, setCurrentSong] = useState(null)
    const [playing, getPlaying] = useState(false)
    const location = useLocation()
    const [dashSearchResults, setDashSearchResults] = useState()
    const [isOnePlaying, getOne] = useState(false)
    const [isTwoPlaying, getTwo] = useState(false)
    const [isThreePlaying, getThree] = useState(false)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log(currentSong, audioList)
        if (location.pathname.split("/") !== "")
            if (audioList[0] !== undefined)
                for (let each in audioList) {
                    if (
                        audioList[each].src !== currentSong &&
                        genreClickCount > prevCount
                    ) {
                        audioList[each].pause()
                    } else console.log("hi")
                }
    }, [location.pathname, currentSong])

    return (
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <LandingPage
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
                            currentPlayer={currentPlayer}
                            getPlaying={getPlaying}
                            setAudioR={setAudioR}
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
                    isOnePlaying={isOnePlaying}
                    isTwoPlaying={isTwoPlaying}
                    isThreePlaying={isThreePlaying}
                    currentPlayer={currentPlayer}
                    playing={playing}
                    genreClickCount={genreClickCount}
                    prevCount={prevCount}
                    audioR={audioR}
                    currentSong={currentSong}
                    oneSongClick={oneSongClick}
                    setOneSongClick={setOneSongClick}
                />
            )}
        </div>
    )
}

export default App
