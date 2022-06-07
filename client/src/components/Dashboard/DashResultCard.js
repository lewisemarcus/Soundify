import React from "react"
import shakeygraves from "../../assets/shakeygraves.jpg"
import { PlayCircleTwoTone } from "@ant-design/icons"
import "./styles/DashResultCard.css"

const DashResultCard = ({
    dashSearchResults,
    setOneSongClick,
    currentPlayer,
    setCurrentSong,
    setIsPlaying,
    getSongInfo,
}) => {
    let searchResults = dashSearchResults

    const handleSearchClick = (event) => {
        event.preventDefault()
        getSongInfo(dashSearchResults)
        setIsPlaying(true)
        if (setOneSongClick !== undefined) {
            setOneSongClick(true)
            currentPlayer.current.src =
                event.currentTarget.attributes.name.value
            setCurrentSong(event.currentTarget.attributes.name.value)
        }
    }
    return (
        <div
            style={{
                backgroundColor: "#141414",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    backgroundColor: "#141414",
                    width: "100%",
                    padding: "1rem",
                }}
            >
                <div
                    className="dash-result-card-container"
                    style={{
                        background:
                            "linear-gradient(315deg, hsla(29, 81%, 61%, 1) 0%, hsla(0, 0%, 0%, 1) 86%)",
                        display: "flex",
                        flexWrap: "wrap",
                        width: "70%",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            zIndex: 1000,
                            margin: 20,
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={shakeygraves}
                            alt="Album Cover"
                            className="dash-result-img"
                        />
                        <PlayCircleTwoTone
                            className="result-play-btn"
                            name={searchResults.link}
                            onClick={handleSearchClick}
                            twoToneColor="#FFA500"
                            style={{
                                fontSize: "3rem",
                            }}
                        />
                        <div
                            style={{
                                marginLeft: "3rem",
                            }}
                        >
                            <h1
                                className="song-title"
                                style={{
                                    color: "white",
                                    fontFamily: "Poppins",
                                }}
                            >
                                {searchResults.title}
                            </h1>
                            <h3
                                className="song-artist"
                                style={{
                                    color: "white",
                                    opacity: "0.7",
                                    fontFamily: "Poppins",
                                }}
                            >
                                {searchResults.artist}
                            </h3>
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: -50,
                            position: "relative",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default DashResultCard
