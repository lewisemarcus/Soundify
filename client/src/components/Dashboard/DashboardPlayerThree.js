import React, { useEffect, useState } from "react"

import "./styles/DashboardPlayer.css"

import DashAudioThree from "./DashAudioThree"

const DashboardPlayerThree = ({
    clickedGenre,
    genreClickCount,
    prevClickCount,
    songData,
    getIndexThree,
    setCurrent,
    currentPlayer,
    setCurrentSong,
    getThree,
    isThreePlaying,
}) => {
    const [songs, setSongs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const songData = await fetch("/songs", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })

                const songList = await songData.json()

                setSongs(songList)
                setIsLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        fetchSongs()
    }, [])
    return isLoading ? (
        "loading"
    ) : (
        <div className="DashPlayer" id="three">
            <DashAudioThree
                isThreePlaying={isThreePlaying}
                getThree={getThree}
                setCurrentSong={setCurrentSong}
                currentPlayer={currentPlayer}
                setCurrent={setCurrent}
                getIndexThree={getIndexThree}
                clickedGenre={clickedGenre}
                genreClickCount={genreClickCount}
                prevClickCount={prevClickCount}
                tracks={songs}
                songData={songData}
            />
        </div>
    )
}

export default DashboardPlayerThree
