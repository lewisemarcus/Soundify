import React, { useState } from "react";
import { Modal, message, Upload, Input, Select, Space, Empty } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import "./styles/SongList.css";

const SongList = () => {
  const username = localStorage.getItem("username");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { Option } = Select;

  const { Dragger } = Upload;

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
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
  };

  return (
    <div className="song-list-wrapper">
      <div className="song-list-header">
        <h1>{username}'s songs</h1>
        <Button className="modal-btn" onClick={showModal}>
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
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Input placeholder="Song title" size="large" />
            <Input placeholder="Artist" size="large" />
            <Select placeholder="Genre" size="large" style={{ width: "100%" }}>
              <Option value="rock">Rock</Option>
              <Option value="rap">Rap</Option>
              <Option value="r&b">R&B</Option>
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
      <div className="song-list-content">
        <Empty />
      </div>
    </div>
  );
};

export default SongList;
