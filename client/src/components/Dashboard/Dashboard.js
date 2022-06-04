import { Row, Col } from "antd"
import { useLazyQuery } from "@apollo/client"
import { GET_SONGS, GET_GENRES } from "../../utils/queries/songQueries"
import React, { useEffect, useState, createRef } from "react"
import DashboardPlayerOne from "./DashboardPlayerOne"
import DashboardPlayerThree from "./DashboardPlayerThree"
import "./styles/Dashboard.css"
import DashAudioControls from "./DashAudioControlOne"
import DashboardPlayerTwo from "./DashboardPlayerTwo"
import { useNavigate, useLocation } from "react-router-dom"

const DashCarousel = ({
    setDashSearchResults,
    setCurrentSong,
    setAudioR,
    genreClickCount,
    setGenreClickCount,
    setAudioList,
}) => {
    let navigate = useNavigate()

    let dashes = ["", "", ""]

    const [searchBar, setSearchBar] = useState("")

    const [audioOne, getAudioOne] = useState()
    const [audioTwo, getAudioTwo] = useState()
    const [indexOne, getIndexOne] = useState(0)
    const [indexTwo, getIndexTwo] = useState(0)
    const [indexThree, getIndexThree] = useState(0)
    const [isOnePlaying, getOne] = useState(false)
    const [isTwoPlaying, getTwo] = useState(false)
    const [isThreePlaying, getThree] = useState(false)
    const [audioThree, getAudioThree] = useState()
    const [currentEvent, setCurrent] = useState()
    const [prevClickCount, setPrevClickCount] = useState(0)
    const [clickedGenre, setClickedGenre] = useState("")
    let audioList = [audioOne, audioTwo, audioThree]

    const [genreSongList, setGenreSongList] = useState([])
    const location = useLocation()
    let dashOne, dashTwo, dashThree
    const [song, { loading, error, data: songData }] = useLazyQuery(GET_SONGS, {
        onCompleted: (songData) => {
            return songData
        },
    })

    if (currentEvent !== undefined) {
        let dash =
            currentEvent.ownerDocument.activeElement.parentNode.parentNode
                .parentNode.parentNode

        if (dash.id === "one") dashes[0] = dash
        else if (dash.id === "two") dashes[1] = dash
        else dashes[2] = dash
    }

    const [
        songByGenre,
        { loading: loadingGenre, error: errorGenre, data: genreData },
    ] = useLazyQuery(GET_GENRES, {
        onCompleted: (genreData) => {
            return genreData
        },
    })

    useEffect(() => {
        if (audioList[0] !== undefined && currentEvent !== undefined) {
            setAudioList(audioList)
            let dash =
                currentEvent.ownerDocument.activeElement.parentNode.parentNode
                    .parentNode.parentNode

            for (let i in dashes) {
                if (dashes[i] !== dash) {
                    audioList[i].pause()
                } else {
                    setCurrentSong(audioList[i].src)
                    setAudioR(audioList[i])
                }
            }
        }
    }, [
        isOnePlaying,
        isTwoPlaying,
        isThreePlaying,
        indexOne,
        indexTwo,
        indexThree,
    ])

    useEffect(() => {
        if (audioList[0] !== undefined) {
            for (let each in audioList) {
                audioList[each].pause()
            }
        }
    }, [location.pathname.split("/")[1] !== ""])

    let songListFromGenre = []

    if (loading) return <p>Loading ...</p>

    if (error) return `Error! ${error}`

    const onChange = (event) => {
        const { value } = event.target
        setSearchBar(value)
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

    const handleSearchClick = (songList) => {
        navigate("./DashResults", { songList })
    }

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
                    placeholder=" Search By Song Title or Artist Name"
                    name="searchBar"
                    id="searchBar"
                    onChange={onChange}
                ></input>
                <button
                    onClick={async () => {
                        if (searchBar !== "") {
                            let { data } = await song({
                                variables: { title: searchBar },
                            })

                            let songList = Object.values(Object.values(data)[0])
                            if (setDashSearchResults !== undefined)
                                setDashSearchResults(songList)
                            handleSearchClick(songList)
                        }
                    }}
                    id="searchBtn"
                >
                    Search
                </button>
            </div>
            <div className="musicPlayer">
                <div className="main-items">
                    <DashboardPlayerOne
                        setCurrent={setCurrent}
                        getOne={getOne}
                        getIndexOne={getIndexOne}
                        selectedAudio={audioOne}
                        getAudioOne={getAudioOne}
                        songData={genreSongList}
                        genreClickCount={genreClickCount}
                        prevClickCount={prevClickCount}
                        clickedGenre={clickedGenre}
                    />
                </div>
                <div className="main-items">
                    <DashboardPlayerTwo
                        setCurrent={setCurrent}
                        getTwo={getTwo}
                        getIndexTwo={getIndexTwo}
                        songData={genreSongList}
                        getAudioTwo={getAudioTwo}
                        genreClickCount={genreClickCount}
                        prevClickCount={prevClickCount}
                        clickedGenre={clickedGenre}
                    />
                </div>
                <div className="main-items">
                    <DashboardPlayerThree
                        setCurrent={setCurrent}
                        getAudioThree={getAudioThree}
                        getIndexThree={getIndexThree}
                        getThree={getThree}
                        songData={genreSongList}
                        genreClickCount={genreClickCount}
                        prevClickCount={prevClickCount}
                        clickedGenre={clickedGenre}
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
