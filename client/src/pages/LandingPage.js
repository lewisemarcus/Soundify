import React, { useContext } from "react"
import "./styles/LandingPage.css"
import { Hero } from "../components"
import Dashboard from "../components/Dashboard/Dashboard"
import { AuthContext } from "../context/authContext"

const LandingPage = ({
    setDashSearchResults,
    setCurrentSong,
    setAudioR,
    genreClickCount,
    setGenreClickCount,
    setAudioList,
    setPrevCount,
}) => {
    const { user } = useContext(AuthContext)

    return (
        <>
            {user ? (
                <>
                    <Dashboard
                        setPrevCount={setPrevCount}
                        setAudioList={setAudioList}
                        genreClickCount={genreClickCount}
                        setGenreClickCount={setGenreClickCount}
                        setAudioR={setAudioR}
                        setCurrentSong={setCurrentSong}
                        setDashSearchResults={setDashSearchResults}
                    />
                </>
            ) : (
                <div className="landing-page-wrapper">
                    <Hero />
                </div>
            )}
        </>
    )
}

export default LandingPage
