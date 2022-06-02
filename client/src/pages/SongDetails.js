import React, { useState, useEffect, useRef } from "react"
import { List, Typography, Divider } from "antd"
import "../components/styles/Slider.css"
import { useParams } from "react-router-dom"
import { GET_SONG } from "../utils/queries/songQueries"
import { useQuery, useMutation } from "@apollo/client"
import AudioSpectrum from "react-audio-spectrum"
import { ADD_COMMENT } from "../utils/mutations/songMutations"
import shakeygraves from "../assets/shakeygraves.jpg"
import LoadMoreList from "../components/CommentSection"
import Waveform from "../components/Wavesurfer"

const myData = ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"]

const SongDetails = () => {
    const username = localStorage.getItem("username")
    const [addComment, { error }] = useMutation(ADD_COMMENT)
    const { songId } = useParams()
    const { loading, data } = useQuery(GET_SONG, {
        variables: { songId: songId },
    })
    const [commentText, setCommentText] = useState("")
    const [characterCount, setCharacterCount] = useState(0)
    const querySong = data?.songById || {}
    const audio = useRef(null)
    const [width, setWidth] = useState(window.innerWidth * (1075 / 1280))
    let loadedPlayer = false
    let isLoaded = useRef(loadedPlayer)

    const addCommentHandler = async (event) => {
        event.preventDefault()

        try {
            const { data } = await addComment({
                variables: {
                    songId,
                    commentText,
                    commentAuthor: username,
                },
            })
            setCommentText("")
        } catch (err) {
            //TODO: Add error handling.
            console.error(err)
        }
    }

    const getCommentText = (event) => {
        const { name, value } = event.target

        if (name === "commentText" && value.length <= 240) {
            setCommentText(value)
            setCharacterCount(value.length)
        }
    }

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
                    <Waveform song={querySong} audio={audio} />
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
                            audioId="audio-element"
                        />
                        <audio
                            id="audio-element"
                            crossOrigin="anonymous"
                            ref={audio}
                            src={querySong.link}
                        ></audio>
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
                        <button style={{ margin: 10 }}>Share</button>
                        <button style={{ margin: 10 }}>Add to Playlist</button>
                        <div style={{ margin: 10, marginRight: 20 }}>
                            Likes:
                        </div>
                    </div>

                    <LoadMoreList
                        comments={querySong.comments}
                        style={{ width: "75%" }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <input
                            value={commentText}
                            onChange={getCommentText}
                            style={{ padding: 10, width: "80%" }}
                            placeholder="Add a comment..."
                        ></input>
                        <button
                            style={{
                                borderTop: "1px solid #888888",
                                borderBottom: "1px solid #888888",
                                backgroundColor: "#FFFFFF",
                                width: "20%",
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
                        dataSource={myData}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text mark>[ITEM]</Typography.Text>
                                {item}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default SongDetails
