import "./styles/DashResults.css"
import { useEffect } from "react"

const DashResults = ({
    dashSearchResults,
    setCurrentSong,
    setOneSongClick,
}) => {
    const handleSearchClick = (event) => {
        event.preventDefault()

        if (setOneSongClick !== undefined) {
            setOneSongClick(true)
            setCurrentSong(event.currentTarget.name)
        }
    }

    return (
        <div className="searchResults">
            <div className="subResults">
                {dashSearchResults.map((song, index) => {
                    return (
                        <>
                            <button
                                className="resultsCard"
                                id="resultsBtn"
                                name={song.link}
                                key={index}
                                onClick={handleSearchClick}
                            >
                                <h1>Title: {song.title}</h1>
                                <p>Artist: {song.artist}</p>
                                <p>Genre: {song.genre}</p>
                            </button>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default DashResults
