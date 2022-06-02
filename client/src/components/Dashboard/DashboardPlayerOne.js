import React, { useEffect, useState } from "react"

import "./styles/DashboardPlayer.css"

import DashAudioOne from "./DashAudioOne"

const DashboardPlayerOne = ({
    clickedGenre,
    genreClickCount,
    prevClickCount,
    tracks,
    songData,
    getAudioOne,
    getOne,
    getIndexOne,
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
        <div className="DashPlayer" id="one">
            <DashAudioOne
                setCurrent={setCurrent}
                getOne={getOne}
                getIndexOne={getIndexOne}
                getAudioOne={getAudioOne}
                clickedGenre={clickedGenre}
                genreClickCount={genreClickCount}
                prevClickCount={prevClickCount}
                tracks={songs}
                songData={songData}
            />
        </div>
    )
}

export default DashboardPlayerOne
