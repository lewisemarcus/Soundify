import React, { useState } from "react";
import { Empty, PageHeader } from "antd";
import "./styles/SongList.css";
import { GET_USER_SONGS } from "../utils/queries/songQueries";
import { useQuery } from "@apollo/client";
import orange from "../assets/orange.png";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "../components/Dashboard/styles/Dashboard2.scss";
import playBtn from "../assets/playBtn.png";
import pauseBtn from "../assets/pauseBtn.png";
const UserPage = ({
  setIsPlaying,
  isPlaying,
  currentSong,
  setCurrentSong,
  getSongInfo,
  currentPlayer,
}) => {
  let navigate = useNavigate();
  const { username } = useParams();
  const { loading, data, refetch } = useQuery(GET_USER_SONGS, {
    variables: { username: username },
  });

  const usersSongs = data?.userSongs || [];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "9rem",
        }}
      >
        <CircularProgress style={{ color: "orange" }} />
      </Box>
    );
  }

  const handleSongClick = (event) => {
    navigate(`/song/${event.currentTarget.attributes.name.value}`);
  };
  return (
    <div className="song-list-wrapper">
      {usersSongs.length === 0 ? (
        <div className="empty-page">
          <Empty
            description={
              <span className="empty-description">
                This user hasn't uploaded any songs
              </span>
            }
            style={{ marginTop: "5rem" }}
            className="empty-description-container"
          />
        </div>
      ) : (
        <div className="uploaded-song-container">
          {/* <div style={{ color: "black" }}>{username}'s Songs</div> */}

          <PageHeader
            className="user-page-header"
            onBack={() => {
              navigate("/");
            }}
            title={`${username}'s Songs`}
          />
          {usersSongs.map((song) => {
            return (
              <div className="song-row">
                <div className="song-information">
                  <input
                    onClick={(event) => {
                      event.preventDefault();
                      setIsPlaying(!isPlaying);
                      if (currentSong !== song.link) {
                        setCurrentSong(song.link);
                        setIsPlaying(true);
                      }

                      getSongInfo({
                        title: song.title,
                        artist: song.artist,
                      });

                      if (!isPlaying) currentPlayer.current.pause();
                      else currentPlayer.current.play();
                    }}
                    type="image"
                    src={isPlaying ? pauseBtn : playBtn}
                    name="playBtn"
                    className="play-button"
                    alt="play button"
                  />
                  <img
                    src={song.cover ? song.cover : orange}
                    alt="Album Cover"
                    style={{ marginLeft: "1rem" }}
                  />
                  <div
                    className="song-text"
                    name={song._id}
                    onClick={(event) => {
                      event.preventDefault();
                      handleSongClick(event);
                    }}
                  >
                    <h4>{song.title}</h4>
                    <h5>{song.artist}</h5>
                    <h6>{song.genre}</h6>
                    <h6>{song.uploaded}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserPage;
