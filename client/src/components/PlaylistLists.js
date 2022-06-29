import { useNavigate } from "react-router-dom";
import { useState } from "react";
import orange from "../assets/orange.png";
import shakeygraves from "../assets/shakeygraves.jpg";
import "./styles/PlaylistList.scss";
import "./Dashboard/styles/Dashboard2.scss";
import playBtn from "../assets/playBtn.png";
import pauseBtn from "../assets/pauseBtn.png";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { REMOVE_FROM_PLAYLIST } from "../utils/mutations/playlistMutations";
import { Empty, message } from "antd";
const PlaylistList = ({
  currentPlayer,
  data,
  setIsPlaying,
  isPlaying,
  currentSong,
  getSongInfo,
  setCurrentSong,
  singlePL,
  setDeleting,
  refetch,
  trackIndex,
  getTrackIndex,
}) => {
  let navigate = useNavigate();
  const [removeFromPlaylist, { error }] = useMutation(REMOVE_FROM_PLAYLIST);
  const handleSongClick = (song) => {
    navigate(`/song/${song._id}`);
  };
  const token = localStorage.getItem("token");
  const handleDelete = async (event, song) => {
    setDeleting(true);
    event.preventDefault();

    try {
      await removeFromPlaylist({
        variables: {
          playlistId: singlePL._id,
          songId: song._id,
          token: token,
        },
      });
      await message.success("Removed song from playlist.");
      await refetch();
    } catch (err) {
      message.error("Error removing song from playlist.");
    }
    setDeleting(false);
  };

  return (
    <div className="playlist-data-container">
      <div className="playlist-information-header">
        <img src={shakeygraves} alt="Shakey Graves" />
        <div>
          <h3>{data.plTitle}</h3>
          <h4>
            {data.songs.length === 1
              ? `${data.songs.length} song`
              : `${data.songs.length} songs`}
          </h4>
        </div>
      </div>
      {data.songs.length === 0 && (
        <Empty description="You have no songs in your playlist" />
      )}
      {data.songs.map((song, index) => {
        return (
          <div className="playlist-song-row">
            <div className="playlist-song-information">
              <input
                onClick={(event) => {
                  event.preventDefault();
                  getTrackIndex(index);
                  setIsPlaying(!isPlaying);
                  if (currentSong !== song.link) {
                    setIsPlaying(true);
                    setCurrentSong(song.link);
                  }
                  getSongInfo({
                    title: song.title,
                    artist: song.artist,
                  });

                  if (!isPlaying) currentPlayer.current.pause();
                  else currentPlayer.current.play();
                }}
                style={{}}
                type="image"
                src={isPlaying && trackIndex === index ? pauseBtn : playBtn}
                name="playBtn"
                className="play-button"
                alt="play button"
              />
              <img
                src={song.cover ? song.cover : orange}
                alt="Album Cover"
                style={{ marginLeft: "1rem" }}
              />

              <div className="playlist-song-text">
                <h4 onClick={() => handleSongClick(song)}>{song.title}</h4>
                <h5>{song.artist}</h5>
              </div>
            </div>
            <div>
              <DeleteOutlined
                onClick={(event) => handleDelete(event, song)}
                style={{ fontSize: "1.2rem" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistList;
