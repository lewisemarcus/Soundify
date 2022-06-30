import React, { useState, useEffect } from "react";
import { Empty, PageHeader, Tabs } from "antd";
import "./styles/SongList.css";
import { GET_USER_SONGS, GET_USER } from "../utils/queries/songQueries";
import { useQuery } from "@apollo/client";
import orange from "../assets/orange.png";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "../components/Dashboard/styles/Dashboard2.scss";
import playBtn from "../assets/playBtn.png";
import pauseBtn from "../assets/pauseBtn.png";
import { Avatar, Tab } from "antd";
import {
  AndroidOutlined,
  AppleOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./styles/UserPage.scss";

const { TabPane } = Tabs;

const UserPage = ({
  setIsPlaying,
  isPlaying,
  currentSong,
  setCurrentSong,
  getSongInfo,
  currentPlayer,
  trackIndex,
  getTrackIndex,
}) => {
  let navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [loadingUser, setIsLoadingUser] = useState(true);

  const { loading, data, refetch } = useQuery(GET_USER_SONGS, {
    variables: { username: username },
  });

  const usersSongs = data?.userSongs || [];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetch(`/user/${username}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const user = await userData.json();

        await setUser(user);
        await setIsLoadingUser(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

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
    <div className="user-page-wrapper">
      {loadingUser ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          <CircularProgress style={{ color: "orange" }} />
        </Box>
      ) : (
        <>
          <div className="user-hero">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                style={{
                  backgroundColor: "var(--dark)",
                  width: "8rem",
                  height: "8rem",
                }}
                icon={
                  <UserOutlined
                    style={{
                      fontSize: "3.5rem",
                      marginTop: "1.9rem",
                    }}
                  />
                }
                className="user-avatar"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              className="user-page-text"
            >
              <div style={{ marginBottom: "-.5rem" }}>
                <h3>{username}</h3>
              </div>
              <h5>Uploaded songs: {user[0].songs.length}</h5>
              <h5>Created playlists: {user[0].playlists.length}</h5>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className="user-list-wrapper">
              {usersSongs.length === 0 ? (
                <div className="empty-page" style={{ marginTop: "3rem" }}>
                  <Empty
                    description={
                      <span className="empty-description">
                        {username} currently has no songs
                      </span>
                    }
                    style={{ marginTop: "5rem" }}
                    className="empty-description-container"
                  />
                </div>
              ) : (
                <div
                  className="user-song-container"
                  style={{ marginTop: "-1rem" }}
                >
                  <div
                    style={{
                      color: "black",
                      padding: "1rem",
                    }}
                  >
                    {username}'s Songs
                  </div>
                  {usersSongs.map((song, index) => {
                    return (
                      <div className="user-song-row">
                        <div className="user-song-information">
                          <input
                            onClick={(event) => {
                              event.preventDefault();
                              getTrackIndex(index);
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
                            src={
                              isPlaying && trackIndex === index
                                ? pauseBtn
                                : playBtn
                            }
                            name="playBtn"
                            className="user-play-button"
                            alt="play button"
                          />
                          <img
                            src={song.cover ? song.cover : orange}
                            alt="Album Cover"
                            style={{
                              marginLeft: "1rem",
                            }}
                          />
                          <div
                            className="user-song-text"
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
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
