import React, { useState, useEffect, useRef } from "react"
import { AiFillPlusCircle } from "react-icons/ai"
import {
    List,
    Typography,
    Divider,
    Modal,
    message,
    Input,
    Space,
    Button,
} from "antd"
import "../components/styles/Slider.css"
import { Link, useParams } from "react-router-dom"
import {
    GET_SONG,
    GET_GENRES,
    GET_USER_PLAYLIST,
} from "../utils/queries/songQueries"
import { useQuery, useMutation } from "@apollo/client"
import AudioSpectrum from "react-audio-spectrum"
import { ADD_COMMENT } from "../utils/mutations/commentMutations"
import shakeygraves from "../assets/shakeygraves.jpg"
import CommentSection from "../components/CommentSection"
import Waveform from "../components/Wavesurfer"
import "../components/styles/CommentSection.css"
import shuffleArray from "../utils/helpers/shuffleArray"
import { useForm } from "../utils/hooks/hooks"
import {
    CREATEPLAYLIST,
    ADDTOPLAYLIST,
} from "../utils/mutations/playlistMutations"
import "./styles/SongDetail.css"

const SongDetails = ({
    setCurrentSong,
    isPlaying,
    currentPlayer,
    setIsPlaying,
    getSongInfo,
    isDetailsPlaying,
}) => {
    const username = localStorage.getItem("username")
    const [addComment, { error }] = useMutation(ADD_COMMENT)
    const { songId } = useParams()
    const { loading, data } = useQuery(GET_SONG, {
        variables: { songId: songId },
    })
    const recSongs = []
    const [list, setList] = useState([])
    const [commentText, setCommentText] = useState("")
    const [characterCount, setCharacterCount] = useState(0)
    const querySong = data?.songById || {}
    const { loading: recLoading, data: recdata } = useQuery(GET_GENRES, {
        variables: { genre: querySong.genre },
    })
    const recommended = recdata?.songByGenre || []
    const recList = Object.values(recommended)
    const audio = useRef(null)
    const [width, setWidth] = useState(window.innerWidth * (1075 / 1280))
    let loadedPlayer = false
    let isLoaded = useRef(loadedPlayer)
    const addCommentHandler = async (event) => {
        event.preventDefault()

        try {
            await addComment({
                variables: {
                    songId: songId,
                    token: localStorage.getItem("token"),
                    commentText: commentText,
                    commentAuthor: username,
                },
            })
            setCommentText("")
        } catch (err) {
            //TODO: Add error handling.
            console.error(err)
        }
    }

    // CREATE-ADD TO PLAYLIST MODAL
    const { loading: playlistloading, data: userPlaylists } = useQuery(
        GET_USER_PLAYLIST,
        {
            variables: { owner: username },
        },
    )
    const usersPlaylists = userPlaylists?.userPlaylists || []
    const uPL = Object.values(usersPlaylists)
    console.log(userPlaylists)

    useEffect(() => {
        console.log(uPL)
    }, [usersPlaylists])

    // const [newPlaylist, setNewPlaylist] = useState()

    function registerUserCallback() {
        console.log("callback hit")
        const hide = message.loading("Creating playlist...", 0)
        setTimeout(hide, 1100)
    }

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        playlistname: "",
    })

    const [createPlaylist, { error: playlistCreationError }] =
        useMutation(CREATEPLAYLIST)

    const [addToPlaylist, { error: addToPlaylistError }] =
        useMutation(ADDTOPLAYLIST)

    const [playlist, setPlaylist] = useState({
        playlistname: "",
        username: username,
        songId: songId,
    })

    const success = async () => {
        await message.loading("Uploading playlist...")
        await message.success("Successfully added song to playlist!")
    }

    const modalError = () => {
        message.error("Must give playlist a name.")
    }

    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCreatePlaylist = async (e) => {
        e.preventDefault()
        if (values.playlistname === "") {
            return modalError()
        }

        await createPlaylist({
            variables: {
                playlistname: values.playlistname,
                username: username,
                songId: querySong._id,
            },
        })
        setIsModalVisible(false)
        success()
    }

    const handleAddToPlaylist = async (e) => {
        e.preventDefault()
        await addToPlaylist({
            variables: {
                _id: e.currentTarget.id,
                songId: querySong._id,
            },
        })
        setIsModalVisible(false)
        success()
    }

    const handleCancel = () => {
        // setSong({
        //     title: "",
        //     genre: "",
        //     username: username,
        //     artist: "",
        //     filename: "",
        //     link: "",
        // });
        setIsModalVisible(false)
    }

    // END PLAYLIST MODAL

    const getCommentText = (event) => {
        const { name, value } = event.target

        if (name === "commentText" && value.length <= 240) {
            setCommentText(value)
            setCharacterCount(value.length)
        }
    }

    useEffect(() => {
        if (Object.keys(querySong).length !== 0) getSongInfo(querySong)
        currentPlayer.current.src = querySong.link
    }, [querySong.link])

    useEffect(() => {
        if (querySong.link !== undefined) {
            // console.log(audio.current)
            setCurrentSong(querySong.link)
        }
    }, [querySong.link])

    useEffect(() => {
        if (recList.length != 0) {
            shuffleArray(recList)
            let count = 0
            let top = 5
            while (count < top) {
                if (recList[count] === undefined) count++
                else if (
                    querySong.title !== recList[count].title &&
                    !recSongs.includes(recList[count])
                ) {
                    recSongs.push(recList[count])
                    count++
                } else {
                    count++
                    top++
                }
            }
            setList(recSongs)
        }
    }, [recList.length != 0])
    useEffect(() => {
        window.addEventListener("resize", function () {
            setWidth(window.innerWidth * (1075 / 1280))
        })
        isLoaded.current = true
    })
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div
            style={{
                backgroundColor: "#141414",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: 100,
                paddingBottom: 100,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    backgroundColor: "#434343",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        background:
                            "linear-gradient(315deg, hsla(29, 81%, 61%, 1) 0%, hsla(0, 0%, 0%, 1) 86%)",
                        display: "flex",
                        flexWrap: "wrap",
                        width: "85%",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            zIndex: 1000,
                            margin: 10,
                            marginBottom: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img src={shakeygraves} alt="Album Cover" />
                        <h1 style={{ color: "white" }}>{querySong.title}</h1>
                        <h2 style={{ color: "white" }}>
                            By {querySong.artist}
                        </h2>
                    </div>
                    <Waveform
                        querySong={querySong}
                        isDetailsPlaying={isDetailsPlaying}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        song={querySong}
                        audio={currentPlayer}
                    />
                    <div
                        style={{
                            marginTop: -50,
                            position: "relative",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        <AudioSpectrum
                            height={100}
                            width={width}
                            id="audio-canvas"
                            audioEle={currentPlayer.current}
                        />
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}></div>
            </div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        background: "#F1EEE9",
                        width: "62%",
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >
                        <div style={{ margin: 10, marginLeft: 20 }}>
                            Comments
                        </div>
                        <button
                            style={{ margin: 10 }}
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    window.location.href,
                                )
                                alert("Song URL copied to clipboard!")
                            }}
                        >
                            Share
                        </button>
                        <button style={{ margin: 10 }} onClick={showModal}>
                            Add to Playlist
                        </button>
                        <Modal
                            title="Select Playlist"
                            className="select-list"
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            destroyOnClose
                            footer={[
                                <Button key="cancel" onClick={handleCancel}>
                                    Cancel
                                </Button>,
                            ]}
                        >
                            <Space style={{ display: "block" }}>
                                <div className="create-plist">
                                    <Input
                                        onChange={onChange}
                                        className="create-playlistinput"
                                        name="playlistname"
                                        value={values.playlistname}
                                        placeholder="Create Playlist"
                                        size="large"
                                        required
                                    />
                                    <AiFillPlusCircle
                                        className="create-playlist"
                                        onClick={handleCreatePlaylist}
                                    />
                                </div>
                                {usersPlaylists.map((playlist) => {
                                    return (
                                        <button
                                            key={playlist._id}
                                            id={playlist._id}
                                            className="add-playlist"
                                            onClick={handleAddToPlaylist}
                                        >
                                            {playlist.plTitle}
                                        </button>
                                    )
                                })}
                            </Space>
                        </Modal>
                    </div>

                    <CommentSection
                        comments={querySong.comments}
                        songId={songId}
                        style={{ width: "75%" }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <input
                            name="commentText"
                            value={commentText}
                            onChange={getCommentText}
                            style={{ padding: 10, width: "85%" }}
                            placeholder="Add a comment..."
                        ></input>
                        <button
                            onClick={addCommentHandler}
                            style={{
                                borderTop: "1px solid #888888",
                                borderBottom: "1px solid #888888",
                                backgroundColor: "#FFFFFF",
                                width: "15%",
                                textAlign: "center",
                            }}
                        >
                            COMMENT
                        </button>
                    </div>
                </div>
                <div
                    style={{
                        minWidth: "20%",
                        background: "#F1EEE9",
                        borderLeft: "1px solid #434343",
                    }}
                >
                    <Divider orientation="left">Recommended</Divider>
                    <List
                        header={
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                Here are some songs related to "
                                {querySong.title}"
                            </div>
                        }
                        footer={<div>Footer</div>}
                        bordered
                        dataSource={list}
                        renderItem={(item) => (
                            <List.Item>
                                <Link to={`/song/${item._id}`}>
                                    <Typography.Text mark>LINK</Typography.Text>
                                </Link>{" "}
                                {item.title} by {item.artist}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default SongDetails
