import React from "react";
import AudioPlayer from "../components/MusicPlayer/AudioPlayer";
import tracks from "../components/MusicPlayer/tracks";
import "./styles/MusicPlayer.css";

const Playlists = () => {
  return (
    <div>
      <h1>Playlist created by user</h1>
      <AudioPlayer tracks={tracks} />
    </div>
  );
};

export default Playlists;
