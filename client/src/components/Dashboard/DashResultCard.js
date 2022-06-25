import React from "react";
import shakeygraves from "../../assets/shakeygraves.jpg";
import { PlayCircleTwoTone } from "@ant-design/icons";
import "./styles/DashResultCard.css";

const DashResultCard = ({
  dashSearchResults,
  setOneSongClick,
  currentPlayer,
  setCurrentSong,
  setIsPlaying,
  getSongInfo,
}) => {
  let searchResults = dashSearchResults;

  const handleSearchClick = (event) => {
    event.preventDefault();
    getSongInfo(dashSearchResults);
    setIsPlaying(true);
    if (setOneSongClick !== undefined) {
      setOneSongClick(true);
      currentPlayer.current.src = event.currentTarget.attributes.name.value;
      setCurrentSong(event.currentTarget.attributes.name.value);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "wrap",
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
        <div className="dash-result-card-container">
          <div
            style={{
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              width: "50rem",
              margin: "0 auto",
            }}
          >
            <img
              src={shakeygraves}
              alt="Album Cover"
              className="dash-result-img"
            />
            <PlayCircleTwoTone
              className="result-play-btn"
              name={searchResults.link}
              onClick={handleSearchClick}
              twoToneColor="#FFA500"
              style={{
                fontSize: "3rem",
              }}
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
    </div>
  );
};

export default DashResultCard;
