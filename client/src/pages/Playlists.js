import React, { useState, useEffect } from "react";
import AudioPlayer from "../components/MusicPlayer/AudioPlayer";
import tracks from "../components/MusicPlayer/tracks";
import { AiFillCloseCircle } from "react-icons/ai";
import "./styles/Playlists.css"
import { Row, Col } from "antd"
import PlaylistCard from "../components/PlaylistCard"
import { useLazyQuery } from "@apollo/client";
import { GET_SONGS } from "../utils/queries/songQueries";

const Playlists = ({ tracks, songData }) => {
  const [song, { loading, error, data: myData }] = useLazyQuery(GET_SONGS);
  // const [songInfo, setSongInfo] = useState(tracks[trackIndex])
  // const [trackIndex, setTrackIndex] = useState(0)
  // const originalData = [...songData]

  return (
    <div style={{ height: '100vh' }}>
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
              <Col span={8}><h2 className="playlist-header">{song.title}</h2></Col>
              <Col span={8}><h2 className="playlist-header">{song.artist}</h2></Col>
              <Col span={8}><i className="trashcan" style={{ color: 'red', marginTop: '7px' }}><AiFillCloseCircle /></i></Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
