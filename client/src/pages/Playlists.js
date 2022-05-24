import React from "react";
import AudioPlayer from "../components/MusicPlayer/AudioPlayer";
import tracks from "../components/MusicPlayer/tracks";
import { AiFillCloseCircle } from "react-icons/ai";
import "./styles/Playlists.css"
import { Row, Col } from "antd"
import PlaylistCard from "../components/Playlists"

const Playlists = (props) => {

const renderPlayList = props.songs.map((songs) => {
  return <PlaylistCard song={songs}></PlaylistCard>;
})

  return (
    <div>
      <h1>Playlist created by user</h1>
      <div className="Playlist-container">
          <AudioPlayer tracks={tracks} />
          <div className="item">
              <h2 className="playlist-title">Playlist Name:</h2>
              <div className="headers">
                <Row>
                  <Col span={8}><h2 className="playlist-header">Title</h2></Col>
                  <Col span={8}><h2 className="playlist-header">Artist</h2></Col>
                  <Col span={8}><h2 className="playlist-header">Remove</h2></Col>
                </Row>
            </div>
            <div className="content">
              {renderPlayList}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Playlists;
