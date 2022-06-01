import React, { useEffect, useState } from "react"

import "./styles/DashboardPlayer.css"

import DashAudio from "./DashAudio"

const DashboardPlayer = ({
    songData,
    clickedGenre,
    genreClickCount,
    prevClickCount,
    name,
    getAudioOne,
    getAudioTwo,
    getAudioThree,
    getIsPlaying,
    src,
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
        <div name={name} id={name} src={src} className="DashPlayer">
            <DashAudio
                getIsPlaying={getIsPlaying}
                getAudioOne={getAudioOne}
                getAudioTwo={getAudioTwo}
                getAudioThree={getAudioThree}
                prevClickCount={prevClickCount}
                genreClickCount={genreClickCount}
                clickedGenre={clickedGenre}
                tracks={songs}
                songData={songData}
            />
        </div>
    )
}

export default DashboardPlayer
