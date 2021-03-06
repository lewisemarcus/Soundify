import React from "react";
import shakeygraves from "../../assets/shakeygraves.jpg";
import { PlayCircleTwoTone } from "@ant-design/icons";
import "./styles/DashResultCard.css";
import { useNavigate } from "react-router-dom";
import orange from "../../assets/orange.png";
const DashResultCard = ({
  dashSearchResults,
  setOneSongClick,
  currentPlayer,
  setCurrentSong,
  setIsPlaying,
  getSongInfo,
  setSinglePL,
}) => {
  let searchResults = dashSearchResults;
  let navigate = useNavigate();

  const handleSearchClick = (event) => {
    event.preventDefault();
    getSongInfo(dashSearchResults);
    setIsPlaying(true);
    if (setOneSongClick !== undefined) {
      setOneSongClick(true);
      currentPlayer.current.src = event.currentTarget.attributes.name.value;
      setCurrentSong(event.currentTarget.attributes.name.value);
      setSinglePL([]);
    }
  };

  const handleSongClick = (searchResults) => {
    navigate(`/song/${searchResults._id}`);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <div
          className="dash-result-card-container"
          onClick={() => handleSongClick(searchResults)}
        >
          <div
            style={{
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <div
                style={{
                  zIndex: 1000,
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  margin: "0 auto",
                }}
              >
                <img
                  src={searchResults.cover ? searchResults.cover : orange}
                  alt="Album Cover"
                  className="dash-result-img"
                />
                <div
                  style={{
                    marginLeft: "2rem",
                  }}
                >
                  <h4 className="song-title">{searchResults.title}</h4>
                  <h5 className="song-artist">{searchResults.artist}</h5>
                  <h6 className="song-genre">{searchResults.genre}</h6>
                </div>
              </div>
              <div
                style={{
                  marginTop: -50,
                  position: "relative",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              ></div>
            </div>
          </div>
          <div
            style={{
              marginTop: -50,
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DashResultCard;
