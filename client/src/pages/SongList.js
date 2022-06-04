import React, { useState } from "react";
import {
  Modal,
  message,
  Upload,
  Input,
  Select,
  Space,
  Empty,
  Table,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import "./styles/SongList.css";
import { GET_USER_SONGS } from "../utils/queries/songQueries";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import axios from "axios";

const SongList = () => {
  const username = localStorage.getItem("username");
  const { loading, data } = useQuery(GET_USER_SONGS, {
    variables: { username: username },
  });
  const usersSongs = data?.userSongs || [];
  console.log(usersSongs);
  const [song, setSong] = useState({
    title: "",
    genre: "",
    username: username,
    artist: "",
    filename: "",
    link: "",
  });
  const [file, setFile] = useState(null);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
  ];

  const success = async () => {
    await message.loading("Uploading song...");
    await message.success("Successfully uploaded song!");
  };

  const error = () => {
    message.error("Must fill out all fields!");
  };

  const handleChange = (event) => {
    if (event.label) {
      const value = event.value;
      const name = "genre";
      setSong((prevInput) => {
        return {
          ...prevInput,
          [name]: value,
        };
      });
    } else {
      const { name, value } = event.target;
      setSong((prevInput) => {
        return {
          ...prevInput,
          [name]: value,
        };
      });
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (
      song.title === "" ||
      song.artist === "" ||
      song.genre === "" ||
      file === null
    ) {
      return error();
    }
    setIsModalVisible(false);
    success();
    const tags = song.title.split(" ");
    tags.push(song.genre, song.artist.split(" "));
    const formData = new FormData();
    formData.append("username", song.username);
    formData.append("genre", song.genre);
    formData.append("artist", song.artist);
    formData.append("title", song.title);
    formData.append("tags", tags);
    formData.append("filename", file);
    try {
      const res = await axios({
        method: "post",
        url: "/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      await window.location.reload();
    } catch (err) {
      error();
    }
  };

  const handleCancel = () => {
    setSong({
      title: "",
      genre: "",
      username: username,
      artist: "",
      filename: "",
      link: "",
    });
    setIsModalVisible(false);
  };

  const { Option } = Select;

  const { Dragger } = Upload;

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
    // customRequest({ onSuccess, onError, file }) {
    //   const tags = song.title.split(" ");
    //   tags.push(song.genre, song.artist.split(" "));
    //   const formData = new FormData();
    //   formData.append("username", song.username);
    //   formData.append("genre", song.genre);
    //   formData.append("artist", song.artist);
    //   formData.append("title", song.title);
    //   formData.append("tags", tags);
    //   formData.append("filename", file);
    //   fetch("/upload", {
    //     method: "POST",
    //     body: formData,
    //     mode: "cors",
    //   });
    // },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload(file) {
      setFile(file);
      console.log(file.size / 1024 / 1024);
      const isLt2M = file.size / 1024 / 1024 < 100;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return false;
    },
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="song-list-wrapper">
      <div className="song-list-header">
        <h1>My Songs</h1>
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
          destroyOnClose
        >
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
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
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </Space>
        </Modal>
      </div>
      {usersSongs.length === 0 ? (
        <Empty
          description={<span>You haven't uploaded any songs</span>}
          style={{ marginTop: "5rem" }}
        />
      ) : (
        <Table
          style={{
            margin: "4rem auto",
            maxWidth: "70%",
          }}
          dataSource={usersSongs}
          columns={columns}
          scroll={{ y: 240 }}
          pagination={false}
          className="table"
        />
      )}
    </div>
  );
};

export default SongList;
