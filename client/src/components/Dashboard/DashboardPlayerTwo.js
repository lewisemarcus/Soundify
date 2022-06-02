import React, { useEffect, useState } from "react"

import "./styles/DashboardPlayer.css"

import DashAudioTwo from "./DashAudioTwo"

const DashboardPlayerTwo = ({
    clickedGenre,
    genreClickCount,
    prevClickCount,
    tracks,
    songData,
    getTwo,
    getAudioTwo,
    getIndexTwo,
    setCurrent,
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
                setCurrent={setCurrent}
                getIndexTwo={getIndexTwo}
                getAudioTwo={getAudioTwo}
                getTwo={getTwo}
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
