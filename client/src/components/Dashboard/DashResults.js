import { SearchBarContext } from "../../context/searchBarContext"
import "./styles/DashResults.css"
import { useContext } from "react"
import { PageHeader } from "antd"
import DashResultCard from "./DashResultCard"
import { useNavigate } from "react-router-dom"

const DashResults = ({
    dashSearchResults,
    setCurrentSong,
    setOneSongClick,
    currentPlayer,
    setIsPlaying,
}) => {
    let searchResults =
        dashSearchResults || JSON.parse(localStorage.getItem("searchResults"))
    const { searchBar } = useContext(SearchBarContext)
    const navigate = useNavigate()

    return (
        <div className="dash-result-container">
            <PageHeader
                className="site-page-header"
                onBack={() => navigate(-1)}
                title={`Search results for "${searchBar}"`}
            />

            {searchResults.map((searchItem) => (
                <DashResultCard
                    setIsPlaying={setIsPlaying}
                    setCurrentSong={setCurrentSong}
                    dashSearchResults={searchItem}
                    setOneSongClick={setOneSongClick}
                    currentPlayer={currentPlayer}
                />
            ))}
        </div>
    )
}

export default DashResults
