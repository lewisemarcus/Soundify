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
    notification,
} from "antd"
import "./styles/Slider.css"
import { useNavigate, useParams } from "react-router-dom"
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
import { ReactComponent as Share } from "../assets/share.svg"
import { ReactComponent as Add } from "../assets/add.svg"
import playlistIcon from "../assets/playlist.png"
import { ReactComponent as CreateIcon } from "../assets/create.svg"
import { CircularProgress, Box } from "@mui/material"

const SongDetails = ({
    setCurrentSong,
    isPlaying,
    currentPlayer,
    setIsPlaying,
    getSongInfo,
    isDetailsPlaying,
    setSinglePL,
}) => {
    const username = localStorage.getItem("username")
    const [addComment, { error }] = useMutation(ADD_COMMENT)
    const { songId } = useParams()
    const { loading, data } = useQuery(GET_SONG, {
        variables: { songId: songId },
    })
    let navigate = useNavigate()
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

    function registerUserCallback() {
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
        if (currentPlayer.current) currentPlayer.current.src = querySong.link
    }, [querySong.link])

    useEffect(() => {
        if (querySong.link !== undefined) {
            setCurrentSong(querySong.link)
            setSinglePL([])
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
    }, [recList.length])
    useEffect(() => {
        window.addEventListener("resize", function () {
            setWidth(window.innerWidth * (1075 / 1280))
        })
        isLoaded.current = true
    })
    if (loading) {
        return (
            <div>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "4rem",
                    }}
                >
                    <CircularProgress style={{ color: "orange" }} />
                </Box>
            </div>
        )
    }
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: "Song URL copied to clipboard!",
        })
    }
    const handleRecSongClick = (item) => {
        navigate(`/song/${item._id}`)
    }
    return (
        <div
            style={{
                backgroundColor: "var(--light)",
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
                    backgroundColor: "#fff",
                    width: "95rem",
                }}
            >
                <div
                    style={{
                        background:
                            "linear-gradient(315deg, hsla(29, 81%, 61%, 1) 0%, hsla(0, 0%, 0%, 1) 86%)",
                        display: "flex",
                        flexWrap: "wrap",
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            zIndex: 1000,
                            padding: 10,
                            marginBottom: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img src={shakeygraves} alt="Album Cover" />
                        <h2 style={{ color: "white", marginTop: "1rem" }}>
                            {querySong.title}
                        </h2>
                        <h3
                            style={{
                                color: "white",
                                opacity: ".7",
                                marginTop: "-.7rem",
                            }}
                        >
                            By {querySong.artist}
                        </h3>
                    </div>
                    <Waveform
                        isDetailsPlaying={isDetailsPlaying}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        audio={currentPlayer}
                    />
                    <div
                        style={{
                            marginTop: -40,
                            width: "100%",
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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                ></div>
            </div>
            <div
                style={{
                    display: "flex",
                    width: "95rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <div
                    className="comment-details"
                    style={{
                        background: "#fff",
                        width: "80%",
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                        // border: "1px solid grey",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            border: "1px solid rgb(218, 218, 218)",
                        }}
                    >
                        <div style={{ margin: 10, marginLeft: 20 }}>
                            {querySong.comments.length === 1 &&
                                `${querySong.comments.length} comment`}
                            {querySong.comments.length === 0 &&
                                `${querySong.comments.length} comments`}
                            {querySong.comments.length > 1 &&
                                `${querySong.comments.length} comments`}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <button
                                style={{
                                    margin: 10,
                                    border: "1px solid grey",
                                    padding: "3px 7px",
                                    fontSize: ".7rem",
                                    borderRadius: "4px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        window.location.href,
                                    )
                                    openNotificationWithIcon("success")
                                }}
                                className="detail-more-btn"
                            >
                                <Share
                                    style={{
                                        width: "1rem",
                                        height: "1rem",
                                        marginRight: ".3rem",
                                    }}
                                />{" "}
                                Share
                            </button>
                            <button
                                style={{
                                    margin: 10,
                                    border: "1px solid grey",
                                    padding: "3px 7px",
                                    fontSize: ".7rem",
                                    borderRadius: "4px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={showModal}
                                className="detail-more-btn"
                            >
                                <Add
                                    style={{
                                        width: "1rem",
                                        height: "1rem",
                                        marginRight: ".3rem",
                                    }}
                                />
                                Add to Playlist
                            </button>
                        </div>
                        <Modal
                            title="Create or Select a Playlist"
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
                                <h4>Create Playlist:</h4>
                                <div className="create-plist">
                                    <Input
                                        onChange={onChange}
                                        className="create-playlistinput"
                                        name="playlistname"
                                        value={values.playlistname}
                                        placeholder="Playlist Title"
                                        size="large"
                                        required
                                    />

                                    <button
                                        className="create-playlist"
                                        onClick={handleCreatePlaylist}
                                    >
                                        <CreateIcon className="create-icon" />
                                        <div>Create</div>
                                    </button>
                                </div>
                                <h4>Playlists:</h4>
                                {usersPlaylists.map((playlist) => {
                                    return (
                                        <>
                                            <div
                                                key={playlist._id}
                                                id={playlist._id}
                                                className="add-playlist"
                                                onClick={handleAddToPlaylist}
                                            >
                                                <img
                                                    src={playlistIcon}
                                                    alt="Playlist"
                                                />
                                                <div>{playlist.plTitle}</div>
                                            </div>
                                        </>
                                    )
                                })}
                            </Space>
                        </Modal>
                    </div>

                    <CommentSection
                        comments={querySong.comments}
                        songId={songId}
                        className="comment-section"
                        // style={{ width: "75%" }}
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
                            className="detail-comment"
                            style={{
                                padding: 10,
                                width: "85%",
                                border: "1px solid rgb(218, 218, 218)",
                            }}
                            placeholder="Add a comment..."
                        ></input>
                        <button
                            className="detail-comment-btn"
                            onClick={addCommentHandler}
                            style={{
                                // borderTop: "1px solid #888888",
                                // borderBottom: "1px solid #888888",
                                padding: "3px 7px",
                                fontSize: ".7rem",
                                width: "15%",
                                background: "var(--orange)",
                                color: "white",
                            }}
                        >
                            COMMENT
                        </button>
                    </div>
                </div>
                <div
                    className="recommended"
                    style={{
                        width: "20%",
                        background: "#fff",
                        // borderLeft: "1px solid grey",
                    }}
                >
                    {/* <Divider orientation="left">Recommended</Divider> */}
                    <List
                        style={{ height: "100%" }}
                        header={
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    fontWeight: "bold",
                                }}
                            >
                                Here are some songs related to "
                                {querySong.title}"
                            </div>
                        }
                        // footer={<div>Footer</div>}
                        bordered
                        dataSource={list}
                        renderItem={(item) => (
                            <List.Item
                                className="rec-song"
                                onClick={() => handleRecSongClick(item)}
                            >
                                {item.title}
                                <br />
                                <span className="rec-artist">
                                    {item.artist}
                                </span>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default SongDetails
