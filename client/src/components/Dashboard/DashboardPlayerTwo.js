import React, { useEffect, useState } from "react"

import "./styles/DashboardPlayer.css"

import DashAudioTwo from "./DashAudioTwo"

const DashboardPlayerTwo = ({
    clickedGenre,
    genreClickCount,
    prevClickCount,
    songData,
    getIndexTwo,
    setCurrent,
    currentPlayer,
    setCurrentSong,
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
        <div className="DashPlayer" id="two">
            <DashAudioTwo
                setCurrentSong={setCurrentSong}
                currentPlayer={currentPlayer}
                setCurrent={setCurrent}
                getIndexTwo={getIndexTwo}
                clickedGenre={clickedGenre}
                genreClickCount={genreClickCount}
                prevClickCount={prevClickCount}
                tracks={songs}
                songData={songData}
            />
        </div>
    )
}

export default DashboardPlayerTwo
