import React from "react";
import AudioPlayer from "../components/MusicPlayer/AudioPlayer";
import tracks from "../components/MusicPlayer/tracks";
// import { AiFillCloseCircle } from "react-icons/ai";
import "./styles/Playlists.css"
// import { Row, Col } from "antd"
import PlaylistCard from "../components/PlaylistCard"

const Playlists = (props) => {

const renderPlayList = props.playlist.map((playlist) => {
  return <PlaylistCard playlist={playlist}></PlaylistCard>;
})

  return (
    <div>
      <h1>Playlist created by user</h1>
      <div className="Playlist-container">
          <AudioPlayer tracks={tracks} />
          <div className="item">
            {renderPlayList}
          </div>
      </div>
    </div>
  );
};

export default Playlists;
