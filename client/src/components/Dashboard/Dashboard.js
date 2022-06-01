import { Row, Col } from "antd"
import { useLazyQuery } from "@apollo/client"
import { GET_SONGS, GET_GENRES } from "../../utils/queries/songQueries"
import React, { useEffect, useState, createRef } from "react"
import DashboardPlayer from "./DashboardPlayer"
import "./styles/Dashboard.css"
import DashAudioControls from "./DashAudioControls"

const DashCarousel = () => {
    const [searchBar, setSearchBar] = useState("")
    const [genreClickCount, setGenreClickCount] = useState(0)
    const [audioOne, getAudioOne] = useState()
    const [audioTwo, getAudioTwo] = useState()
    const [isPlaying, getIsPlaying] = useState(false)
    const [audioThree, getAudioThree] = useState()
    const sources = []
    const dashes = []
    let addedListener = false
    const [currentEvent, setCurrent] = useState()
    const [prevClickCount, setPrevClickCount] = useState(0)
    const [clickedGenre, setClickedGenre] = useState("")
    let audioList = [audioOne, audioTwo, audioThree]
    const [genreSongList, setGenreSongList] = useState([])
    let dashOne, dashTwo, dashThree
    const [song, { loading, error, data: myData }] = useLazyQuery(GET_SONGS)
    const [
        songByGenre,
        { loading: loadingGenre, error: errorGenre, data: genreData },
    ] = useLazyQuery(GET_GENRES, {
        onCompleted: (genreData) => {
            return genreData
        },
    })
    window.onload = () => {
        dashOne = document.getElementById("dashOne")
        dashTwo = document.getElementById("dashTwo")
        dashThree = document.getElementById("dashThree")
        for (let each of audioList)
            if (each != undefined) sources.push(each.src)

        if (
            dashOne != null &&
            dashTwo != null &&
            dashThree != null &&
            !addedListener
        ) {
            dashes.push(dashOne, dashTwo, dashThree)
            for (let each in audioList)
                if (audioList[each] !== undefined)
                    dashes[each].src = audioList[each].src
            dashOne.addEventListener("click", (event) =>
                setCurrent(event.currentTarget),
            )
            dashTwo.addEventListener("click", (event) =>
                setCurrent(event.currentTarget),
            )
            dashThree.addEventListener("click", (event) =>
                setCurrent(event.currentTarget),
            )
        }
        addedListener = true
    }

    if (currentEvent !== undefined) {
        for (var i = 0, len = audioList.length; i < len; i++) {
            if (audioList[i].src !== currentEvent.src) {
                audioList[i].pause()
            }
        }
    }

    useEffect(() => {
        window.onload()
        if (audioOne != undefined) {
            // document.activeElement.parentNode.parentNode.parentNode.parentNode.addEventListener(
            //     "click",
            //     function (event) {
            //         console.log(event.currentTarget)
            //         for (var i = 0, len = audioList.length; i < len; i++) {
            //             if (audioList[i] != event.currentTarget) {
            //                 audioList[i].pause()
            //             }
            //         }
            //     },
            //     true,
            // )
        }
    }, [isPlaying])

    let songListFromGenre = []

    if (loading) return <p>Loading ...</p>

    if (error) return `Error! ${error}`

    const onChange = (event) => {
        const { value } = event.target
        setSearchBar(value)
        console.log(searchBar)
    }

    const handleGenreClick = async (genre) => {
        let { data } = await songByGenre({ variables: { genre: genre } })
        songListFromGenre = Object.values(Object.values(data)[0])
        setGenreSongList(songListFromGenre)
        setClickedGenre(genre)
        setPrevClickCount(genreClickCount)
        setGenreClickCount((count) => count + 1)
    }
    let genreList = [
        "Rock",
        "RnB",
        "HipHop",
        "EDM",
        "Pop",
        "Country",
        "Classical",
        "International",
    ]

    const username = localStorage.getItem("username")

    return (
        <div className="main-container">
            <div className="main-header">
                <h2>
                    Welcome,
                    {username.charAt(0).toUpperCase() + username.slice(1)}
                </h2>
            </div>
            <div className="searchContainer">
                <input
                    typeof="text"
                    placeholder="Search By Song Title or Artist Name"
                    name="searchBar"
                    id="searchBar"
                    onChange={onChange}
                ></input>
                <button
                    onClick={() => song({ variables: { title: searchBar } })}
                    id="searchBtn"
                >
                    Search
                </button>
            </div>
            <div className="musicPlayer">
                <div className="main-items">
                    <DashboardPlayer
                        name="dashOne"
                        getIsPlaying={getIsPlaying}
                        getAudioOne={getAudioOne}
                        prevClickCount={prevClickCount}
                        genreClickCount={genreClickCount}
                        clickedGenre={clickedGenre}
                        songData={genreSongList}
                    />
                </div>
                <div className="main-items">
                    <DashboardPlayer
                        name="dashTwo"
                        getIsPlaying={getIsPlaying}
                        getAudioTwo={getAudioTwo}
                        prevClickCount={prevClickCount}
                        genreClickCount={genreClickCount}
                        clickedGenre={clickedGenre}
                        songData={genreSongList}
                    />
                </div>
                <div className="main-items">
                    <DashboardPlayer
                        name="dashThree"
                        getIsPlaying={getIsPlaying}
                        getAudioThree={getAudioThree}
                        prevClickCount={prevClickCount}
                        genreClickCount={genreClickCount}
                        clickedGenre={clickedGenre}
                        songData={genreSongList}
                    />
                </div>
            </div>
            <div></div>

            <div className="genreContainer">
                {genreList.map((genre, index) => (
                    <button
                        key={index}
                        className="genre1"
                        onClick={(event) => {
                            DashAudioControls.onPlayPauseClick = false
                            let { innerHTML } = event.target
                            handleGenreClick(innerHTML)
                        }}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default DashCarousel
