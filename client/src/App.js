import {
    LandingPage,
    Register,
    Login,
    AddSong,
    SongList,
    Playlists,
} from "./pages"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import SongDetails from "./pages/SongDetails"
import { AuthContext } from "./context/authContext"
import { useContext, useState } from "react"
import Footer from "./components/Footer"
import DashResults from "./components/Dashboard/DashResults"

function App() {
    const [oneSongClick, setOneSongClick] = useState(false)
    const [currentSong, setCurrentSong] = useState()
    const [dashSearchResults, setDashSearchResults] = useState()

    const { user } = useContext(AuthContext)

    return (
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <LandingPage
                            setCurrentSong={setCurrentSong}
                            setDashSearchResults={setDashSearchResults}
                        />
                    }
                />
                <Route
                    path="/DashResults"
                    element={
                        <DashResults
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
                <Route path="/song/:songId" element={<SongDetails />} />
                <Route
                    path="/playlists"
                    element={user ? <Playlists /> : <Navigate to="/" />}
                />
            </Routes>

            {user && (
                <Footer
                    currentSong={currentSong}
                    oneSongClick={oneSongClick}
                    setOneSongClick={setOneSongClick}
                />
            )}
        </div>
    )
}

export default App
