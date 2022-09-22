import React, { useState, useEffect } from "react"
import { Modal, message, Upload, Input, Select, Space, Empty } from "antd"
import {
    UploadOutlined,
    QuestionCircleOutlined,
    DeleteOutlined,
} from "@ant-design/icons"
import Button from "../components/Button"
import "./styles/SongList.css"
import { GET_USER_SONGS } from "../utils/queries/songQueries"
import { useQuery, useMutation } from "@apollo/client"
import UpgradeModal from "../components/UpgradeModal"
import axios from "axios"
import { DELETE_SONG } from "../utils/mutations/songMutations"
import orange from "../assets/orange.png"
import { CircularProgress, Box } from "@mui/material"

const SongList = () => {
    const username = localStorage.getItem("username")
    const user = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    const { loading, data, refetch } = useQuery(GET_USER_SONGS, {
        variables: { username: username },
    })
    const [deleted, setDeleted] = useState(false)
    const usersSongs = data?.userSongs || []
    const [removeSong, { error }] = useMutation(DELETE_SONG)
    const [song, setSong] = useState({
        title: "",
        genre: "",
        username: username,
        artist: "",
        filename: "",
        link: "",
    })
    const [file, setFile] = useState(null)
    const [imgFile, setImgFile] = useState(null)
    useEffect(() => {
        refetch()
        setDeleted(false)
    }, [deleted])

    const loadingSong = () => {
        message.loading("Uploading song...", 15)
    }

    const upgradeAccount = () => {
        message.error(
            "Max number of uploads reached for free tier. Please upgrade your account!",
        )
    }

    const errorMessage = () => {
        message.error("Must fill out all fields!")
    }
    const songErrorMessage = () => {
        message.error(
            "Song already exists, please remove the file first if you wish to re-upload.",
        )
    }

    const handleChange = (event) => {
        if (event.label) {
            const value = event.value
            const name = "genre"
            setSong((prevInput) => {
                return {
                    ...prevInput,
                    [name]: value,
                }
            })
        } else {
            const { name, value } = event.target
            setSong((prevInput) => {
                return {
                    ...prevInput,
                    [name]: value,
                }
            })
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [upgradeVisible, setUpgradeVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const showUpgrade = () => {
        setUpgradeVisible(true)
    }

    const upgradeOk = async () => {}

    const upgradeCancel = () => {
        setUpgradeVisible(false)
    }

    const handleOk = async () => {
        if (usersSongs.length > 2 && user.tier == "Free")
            return upgradeAccount()
        if (
            song.title === "" ||
            song.artist === "" ||
            song.genre === "" ||
            file === null
        ) {
            return errorMessage()
        }
        for (let eachSong of usersSongs) {
            if (
                song.title === eachSong.title &&
                song.artist === eachSong.artist &&
                song.genre === eachSong.genre
            )
                return songErrorMessage()
        }
        setIsModalVisible(false)
        const tags = song.title.split(" ")
        tags.push(song.genre, song.artist.split(" "))
        const formData = new FormData()
        formData.append("username", song.username)
        formData.append("genre", song.genre)
        formData.append("artist", song.artist)
        formData.append("title", song.title)
        formData.append("tags", tags)
        formData.append("filename", file)
        formData.append("imgFilename", imgFile)
        await loadingSong()

        try {
            await axios({
                method: "post",
                url: "/upload",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            await window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const removeSongFromList = async (song) => {
        try {
            await removeSong({
                variables: {
                    songId: song._id,
                    token: token,
                    key: song.filename,
                },
            })
            setDeleted(true)

            await message.success("Successfully deleted song")
        } catch (err) {
            message.error("Couldn't delete song.")
        }
    }

    const handleDelete = async (song) => {
        try {
            Modal.confirm({
                title: "Confirm",
                icon: <QuestionCircleOutlined style={{ color: "red" }} />,
                content: "Are you sure you want to delete this song?",
                okText: "Yes",
                cancelText: "No",
                className: "logout",
                onOk() {
                    removeSongFromList(song)
                },
            })
        } catch (err) {
            message.error("Error deleting song.")
        }
    }

    const handleCancel = () => {
        setSong({
            title: "",
            genre: "",
            username: username,
            artist: "",
            filename: "",
            link: "",
        })
        setIsModalVisible(false)
    }

    const { Option } = Select

    const { Dragger } = Upload

    const props = {
        name: "filename",
        uid: "file",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
        },

        accept: "audio/*",
        multiple: false,

        onChange(info) {
            const { status } = info.file
            if (status !== "uploading") {
            }
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`)
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
        beforeUpload(file) {
            setFile(file)
            return false
        },
    }
    const imgProps = {
        name: "imgFilename",
        uid: "imgFile",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
        },

        accept: "image/*",
        multiple: false,

        onChange(info) {
            const { status } = info.file
            if (status !== "uploading") {
            }
            if (status === "done") {
                message.success(
                    `${info.file.name} Image uploaded successfully.`,
                )
            } else if (status === "error") {
                message.error(`${info.file.name} Image upload failed.`)
            }
        },

        beforeUpload(imgFile) {
            setImgFile(imgFile)
            const isLt2M = imgFile.size / 1024 / 1024 < 100
            if (!isLt2M) {
                message.error("Image must smaller than 2MB!")
            }
            return false
        },
    }
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "9rem",
                }}
            >
                <CircularProgress style={{ color: "orange" }} />
            </Box>
        )
    }
    return (
        <div className="song-list-wrapper">
            <UpgradeModal
                upgradeVisible={upgradeVisible}
                upgradeOk={upgradeOk}
                upgradeCancel={upgradeCancel}
            />
            <Modal
                title="Upload Song"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose
                style={{ top: 20, marginBottom: "100px" }}
            >
                <Space
                    direction="vertical"
                    size="middle"
                    style={{ display: "flex" }}
                >
                    <Input
                        onChange={handleChange}
                        name="title"
                        value={song.title}
                        placeholder="Song title"
                        size="large"
                        required
                    />
                    <Input
                        onChange={handleChange}
                        value={song.artist}
                        name="artist"
                        placeholder="Artist"
                        size="large"
                        required
                    />
                    <Select
                        labelInValue
                        placeholder="Genre"
                        size="large"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                    >
                        <Option value="Rock" name="genre" key="1">
                            Rock
                        </Option>
                        <Option value="RnB" name="genre" key="2">
                            RnB
                        </Option>
                        <Option value="HipHop" name="genre" key="3">
                            HipHop
                        </Option>
                        <Option value="EDM" name="genre" key="4">
                            EDM
                        </Option>
                        <Option value="Pop" name="genre" key="5">
                            Pop
                        </Option>
                        <Option value="Country" name="genre" key="6">
                            Country
                        </Option>
                        <Option value="Classical" name="genre" key="7">
                            Classical
                        </Option>
                        <Option value="International" name="genre" key="8">
                            International
                        </Option>
                    </Select>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag a music file to this area to upload
                        </p>
                    </Dragger>
                    <Dragger {...imgProps}>
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag an album cover to this area to upload
                            (optional)
                        </p>
                    </Dragger>
                </Space>
            </Modal>
            {usersSongs.length === 0 ? (
                <div className="empty-page">
                    <Empty
                        description={
                            <span className="empty-description">
                                You haven't uploaded any songs
                            </span>
                        }
                        style={{ marginTop: "5rem" }}
                        className="empty-description-container"
                    />
                    <Button
                        className="modal-btn uploadSongbtn"
                        onClick={showModal}
                    >
                        <Space>
                            <UploadOutlined /> Upload
                        </Space>
                    </Button>
                    <Button
                        className="modal-btn uploadSongbtn"
                        onClick={showUpgrade}
                    >
                        <Space>Upgrade Account</Space>
                    </Button>
                </div>
            ) : (
                <div className="uploaded-song-container">
                    <div className="upload-song-header">
                        <div>
                            <h3>Upload more files here</h3>
                        </div>
                        <Button
                            className="modal-btn uploadSongbtn"
                            onClick={showModal}
                        >
                            <Space>
                                <UploadOutlined /> Upload
                            </Space>
                        </Button>
                        <Button
                            className="modal-btn uploadSongbtn"
                            onClick={showUpgrade}
                        >
                            <Space>Upgrade Account</Space>
                        </Button>
                    </div>
                    {usersSongs.map((song) => {
                        return (
                            <div className="song-row">
                                <div className="song-information">
                                    <img
                                        src={song.cover ? song.cover : orange}
                                        alt="Album Cover"
                                    />
                                    <div className="song-text">
                                        <h4>{song.title}</h4>
                                        <h5>{song.artist}</h5>
                                        <h6>{song.genre}</h6>
                                        <h6>{song.uploaded}</h6>
                                    </div>
                                </div>
                                <div>
                                    <DeleteOutlined
                                        onClick={() => handleDelete(song)}
                                        style={{
                                            fontSize: "1.2rem",
                                            color: "black",
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SongList
