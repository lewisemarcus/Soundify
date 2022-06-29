import { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import "./styles/Playlists.scss";
import "../components/styles/PlaylistList.scss";
import "../components/Dashboard/styles/Dashboard2.scss";
import { Empty, message } from "antd";
import { useQuery } from "@apollo/client";
import { GET_USER_PLAYLIST } from "../utils/queries/songQueries";
import { useLocation } from "react-router-dom";
import PlaylistList from "../components/PlaylistLists";
import { Box, CircularProgress } from "@mui/material";
import playlistIcon from "../assets/playlist.png";
import { useMutation } from "@apollo/client";
import { REMOVE_PLAYLIST } from "../utils/mutations/playlistMutations";

const Playlists = ({
  currentPlayer,
  singlePL,
  setSinglePL,
  setIsPlaying,
  isPlaying,
  currentSong,
  getSongInfo,
  setCurrentSong,
}) => {
  const [removePlaylist, { error }] = useMutation(REMOVE_PLAYLIST);
  const token = localStorage.getItem("token");
  const [currentTarget, setCurrentTarget] = useState(null);
  const username = localStorage.getItem("username");
  const [playlistClicked, setPlaylistClicked] = useState(false);
  const [title, setPlTitle] = useState("");
  const [playlistSong, setPlaylistSong] = useState();
  const [selectedSong, setSelectedSong] = useState(false);
  const [newTitle, setTitle] = useState();
  const [activeState, setActiveState] = useState(-1);
  const [deleting, setDeleting] = useState(false);
  const [r, setR] = useState(false);
  const location = useLocation();

  const {
    loading: playlistloading,
    data,
    refetch,
  } = useQuery(GET_USER_PLAYLIST, {
    variables: { owner: username },
  });
  let currentPlaylists = data?.userPlaylists || [];

  useEffect(() => {
    if (data !== undefined)
      localStorage.setItem("playlists", JSON.stringify(currentPlaylists));
  }, [currentPlaylists]);

  useEffect(() => {
    return setPlaylistClicked(false) && setSinglePL([]);
  }, []);
  useEffect(() => {
    const fetchPlaylists = async () => {
      await refetch();
    };
    fetchPlaylists();
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("singlePL", JSON.stringify(singlePL));
  }, [singlePL]);

  const switchPlaylist = (e) => {
    e.preventDefault();
    setPlTitle(e.currentTarget.outerText);
    setPlaylistClicked(true);

    for (let i = 0; i < currentPlaylists.length; i++) {
      if (currentPlaylists[i]._id === e.currentTarget.id) {
        setCurrentTarget(e.currentTarget.id);
        setSinglePL(currentPlaylists[i]);
      }
    }
  };
  useEffect(() => {
    if (currentTarget)
      for (let each of currentPlaylists)
        if (each._id === currentTarget) setSinglePL(each);
  }, [currentPlaylists]);

  const handleDelete = async (event, playlist) => {
    setDeleting(true);
    event.preventDefault();
    try {
      await removePlaylist({
        variables: {
          playlistId: playlist._id,
          token: token,
        },
      });
      await message.loading("Removing playlist.");
      await refetch();
      await message.success("Playlist removed.");
    } catch (err) {
      console.log(err);
      message.error("Error removing playlist.");
    }
    setDeleting(false);
  };

  return playlistloading ? (
    <div>
      {" "}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "14rem",
        }}
      >
        <CircularProgress style={{ color: "orange" }} />
      </Box>
    </div>
  ) : (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
      <div className="playlist-name-container">
        <h2>Playlists:</h2>
        {currentPlaylists.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem 0",
            }}
          >
            <Empty description="No playlists created" />
          </div>
        )}
        {currentPlaylists.map((playlist, index) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className={`playlist-button ${
                  index === activeState ? "active" : null
                }`}
                key={playlist.plTitle}
                id={playlist._id}
                onClick={(e) => {
                  switchPlaylist(e);
                  setActiveState(index);
                }}
              >
                <div id={playlist._id} className="play-title">
                  <img src={playlistIcon} alt="Playlist" />
                  {playlist.plTitle}
                </div>
              </div>
              <div>
                <DeleteOutlined
                  onClick={(event) => handleDelete(event, playlist)}
                  style={{
                    fontSize: "1.2rem",
                    padding: ".5rem .8rem",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="playlist-container">
        <div className="content">
          {playlistClicked ? (
            <PlaylistList
              refetch={refetch}
              setDeleting={setDeleting}
              singlePL={singlePL}
              currentPlayer={currentPlayer}
              data={singlePL}
              setIsPlaying={setIsPlaying}
              isPlaying={isPlaying}
              currentSong={currentSong}
              getSongInfo={getSongInfo}
              setCurrentSong={setCurrentSong}
            />
          ) : (
            <div className="no-playlist-selected">
              <Empty description="No playlist selected" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
