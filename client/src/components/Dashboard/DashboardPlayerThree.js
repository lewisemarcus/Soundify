import React, { useEffect, useState } from "react"

import "./styles/DashboardPlayer.css"

import DashAudioThree from "./DashAudioThree"

const DashboardPlayerThree = ({
    clickedGenre,
    genreClickCount,
    prevClickCount,
    tracks,
    songData,
    getThree,
    getAudioThree,
    getIndexThree,
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
        <div className="DashPlayer" id="three">
            <DashAudioThree
                setCurrent={setCurrent}
                getIndexThree={getIndexThree}
                getAudioThree={getAudioThree}
                getThree={getThree}
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
