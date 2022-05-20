import {
    LandingPage,
    Register,
    Login,
    AddSong,
    SongList,
    Playlists,
} from "./pages"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import SongDetails from "./pages/SongDetails"

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={<AddSong />} />
                <Route path="/songs" element={<SongList />} />
                <Route path="/song/:songId" element={<SongDetails />} />
                <Route path="/playlists" element={<Playlists />} />
            </Routes>
        </div>
    )
}

export default App
