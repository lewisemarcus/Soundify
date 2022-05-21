import React from "react";
import AudioPlayer from "../components/MusicPlayer/AudioPlayer";
import tracks from "../components/MusicPlayer/tracks";

const { title, artist, color, image, audioSrc } = tracks;

const Playlists = () => {
  return (
    <div>
      <h1>Playlist created by user</h1>
      <AudioPlayer tracks={tracks} />
      <div className="Playlist-container">
        <div className="">
              {/* <img className="" src={ablum} alt='album cover' /> */}
          <div className="content">
            <h2 className="title">{title}</h2>
            <h3 className="artist">{artist}</h3>
          </div>
          <i className="trash icon" style={{color:'red', marginTop: '7px'}}></i>
      </div>
      </div>
    </div>
  );
};

export default Playlists;
