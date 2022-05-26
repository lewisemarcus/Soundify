import React from "react";
import AudioPlayer from "../components/MusicPlayer/AudioPlayer";
import tracks from "../components/MusicPlayer/tracks";
import { AiFillCloseCircle } from "react-icons/ai";
import "./styles/Playlists.css"
import { Row, Col } from "antd"
import PlaylistCard from "../components/PlaylistCard"

const Playlists = () => {

// const renderPlayList = props.playlist.map((playlist) => {
//   return <PlaylistCard playlist={playlist}></PlaylistCard>;
// })

  return (
    <div>
      <h1>Playlist created by user</h1>
      <div className="Playlist-container">
          <AudioPlayer tracks={tracks} />
          <div className="item">
          <div className="content">
            <h2 className="playlist-title">Playlist Name:</h2>
            <div className="headers">
                <Row>
                    <Col span={8}><h2 className="playlist-header">Title</h2></Col>
                    <Col span={8}><h2 className="playlist-header">Artist</h2></Col>
                    <Col span={8}><h2 className="playlist-header">Remove</h2></Col>
                </Row>
            </div>
            <Row>
                <Col span={8}><h2 className="playlist-header">Test</h2></Col>
                <Col span={8}><h2 className="playlist-header">Test</h2></Col>
                <Col span={8}><i className="trashcan" style={{ color: 'red', marginTop: '7px' }}><AiFillCloseCircle /></i></Col>
            </Row>
        </div>
            {/* {renderPlayList} */}
          </div>
      </div>
    </div>
  );
};

export default Playlists;
