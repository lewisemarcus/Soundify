import React, { useState } from "react"
import { Modal, message, Upload, Input, Select, Space, Empty } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import Button from "../components/Button"
import "./styles/SongList.css"

const SongList = () => {
    const username = localStorage.getItem("username")

    const [song, setSong] = useState({
        title: "",
        genre: "",
        username: "",
        filename: "",
        link: "",
    })

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

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
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
        // method: "POST",
        accept: "audio/*",
        multiple: false,
        // action: "http://localhost:4000/upload",
        customRequest({ onSuccess, onError, file }) {
            const formData = new FormData()
            formData.append("username", song.username)
            formData.append("genre", song.genre)
            formData.append("title", song.title)
            formData.append("filename", file)
            fetch("/upload", {
                method: "POST",
                body: formData,
                mode: "cors",
            })
        },
        onChange(info) {
            const { status } = info.file
            if (status !== "uploading") {
                console.log(info.file, info.fileList)
            }
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`)
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files)
        },
        beforeUpload(file) {
            console.log(file.size / 1024 / 1024)
            const isLt2M = file.size / 1024 / 1024 < 100
            if (!isLt2M) {
                message.error("Image must smaller than 2MB!")
            }
        },
    }

    return (
        <div className="song-list-wrapper">
            <div className="song-list-header">
                <h1>{username}'s songs</h1>
                <Button className="modal-btn uploadSongbtn" onClick={showModal}>
                    <Space>
                        <UploadOutlined /> Upload song
                    </Space>
                </Button>
                <Modal
                    title="Upload Song"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
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
                        />
                        <Input
                            onChange={handleChange}
                            value={song.username}
                            name="username"
                            placeholder="Artist"
                            size="large"
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
                            <Option value="Rap" name="genre" key="2">
                                R&B
                            </Option>
                            <Option value="Hiphop" name="genre" key="3">
                                Hiphop
                            </Option>
                            <Option value="EDM" name="genre" key="4">
                                EDM
                            </Option>
                            <Option value="Pop" name="genre" key="5">
                                Pop
                            </Option>
                            <Option value="Classical" name="genre" key="6">
                                Classical
                            </Option>
                        </Select>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <UploadOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly
                                prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                    </Space>
                </Modal>
            </div>
            <div className="song-list-content">
                <Empty />
            </div>
        </div>
    )
}

export default SongList
