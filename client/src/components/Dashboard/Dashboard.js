import { Row, Col } from "antd";
import { useLazyQuery } from "@apollo/client";
import { GET_SONGS, GET_GENRES } from "../../utils/queries/songQueries";
import React, { useEffect, useState, createRef, useContext } from "react";
import DashboardPlayerOne from "./DashboardPlayerOne";
import DashboardPlayerThree from "./DashboardPlayerThree";
import "./styles/Dashboard.css";
import DashAudioControls from "./DashAudioControlOne";
import DashboardPlayerTwo from "./DashboardPlayerTwo";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchBarContext } from "../../context/searchBarContext";
import SearchIcon from "@mui/icons-material/Search";

const DashCarousel = ({
  setDashSearchResults,
  setCurrentSong,
  genreClickCount,
  setGenreClickCount,
  setPrevCount,
  currentPlayer,
  isOnePlaying,
  isTwoPlaying,
  isThreePlaying,
  getOne,
  getTwo,
  getThree,
  currentEvent,
  setCurrent,
}) => {
  let navigate = useNavigate();

  const { searchBar, setSearchBar } = useContext(SearchBarContext);

  const [indexOne, getIndexOne] = useState(0);
  const [indexTwo, getIndexTwo] = useState(0);
  const [indexThree, getIndexThree] = useState(0);
  const [prevClickCount, setPrevClickCount] = useState(0);
  const [clickedGenre, setClickedGenre] = useState("");
  const [genreSongList, setGenreSongList] = useState([]);

  const [song, { loading, error, data: songData }] = useLazyQuery(GET_SONGS, {
    onCompleted: (songData) => {
      return songData;
    },
  });

  const [
    songByGenre,
    { loading: loadingGenre, error: errorGenre, data: genreData },
  ] = useLazyQuery(GET_GENRES, {
    onCompleted: (genreData) => {
      return genreData;
    },
  });

  useEffect(() => {
    if (currentEvent !== undefined) {
      if (isOnePlaying || isTwoPlaying || isThreePlaying) {
        if (currentPlayer.current.src !== currentEvent.attributes.name.value)
          currentPlayer.current.src = currentEvent.attributes.name.value;
      }
    }
  }, [
    isOnePlaying,
    isTwoPlaying,
    isThreePlaying,
    indexOne,
    indexTwo,
    indexThree,
  ]);

  useEffect(() => {
    if (genreClickCount > prevClickCount)
      if (setPrevCount) setPrevCount(prevClickCount);
  }, [genreClickCount, prevClickCount]);

  let songListFromGenre = [];

  if (loading) return <p>Loading ...</p>;

  if (error) return `Error! ${error}`;

  const onChange = (event) => {
    const { value } = event.target;
    setSearchBar(value);
  };

  const handleGenreClick = async (genre) => {
    let { data } = await songByGenre({ variables: { genre: genre } });
    songListFromGenre = Object.values(Object.values(data)[0]);
    setGenreSongList(songListFromGenre);
    setClickedGenre(genre);
    setPrevClickCount(genreClickCount);
    setGenreClickCount((count) => count + 1);
  };
  let genreList = [
    "Rock",
    "RnB",
    "HipHop",
    "EDM",
    "Pop",
    "Country",
    "Classical",
    "International",
  ];

  const handleSearchClick = (songList) => {
    navigate("./DashResults", { songList });
  };

  const username = localStorage.getItem("username");

  return (
    <div className="main-container">
      <div className="main-header">
        <h2>
          Welcome, {""}
          {username.charAt(0).toUpperCase() + username.slice(1)}
        </h2>
      </div>
      <div className="searchContainer">
        <input
          typeof="text"
          placeholder=" Search By Song Title or Artist Name"
          name="searchBar"
          id="searchBar"
          onChange={onChange}
        ></input>
        <button
          onClick={async () => {
            if (searchBar !== "") {
              let { data } = await song({
                variables: { title: searchBar },
              });

              let songList = Object.values(Object.values(data)[0]);
              if (setDashSearchResults !== undefined) {
                setDashSearchResults(songList);
                localStorage.setItem("searchResults", JSON.stringify(songList));
              }
              handleSearchClick(songList);
            }
          }}
          id="searchBtn"
        >
          <SearchIcon />
        </button>
      </div>
      {/* <div className="musicPlayer">
        <div className="main-items">
          <DashboardPlayerOne
            isOnePlaying={isOnePlaying}
            getOne={getOne}
            setCurrentSong={setCurrentSong}
            currentPlayer={currentPlayer}
            setCurrent={setCurrent}
            getIndexOne={getIndexOne}
            songData={genreSongList}
            genreClickCount={genreClickCount}
            prevClickCount={prevClickCount}
            clickedGenre={clickedGenre}
          />
        </div>
        <div className="main-items">
          <DashboardPlayerTwo
            isTwoPlaying={isTwoPlaying}
            getTwo={getTwo}
            setCurrentSong={setCurrentSong}
            currentPlayer={currentPlayer}
            setCurrent={setCurrent}
            getIndexTwo={getIndexTwo}
            songData={genreSongList}
            genreClickCount={genreClickCount}
            prevClickCount={prevClickCount}
            clickedGenre={clickedGenre}
          />
        </div>
        <div className="main-items">
          <DashboardPlayerThree
            isThreePlaying={isThreePlaying}
            getThree={getThree}
            setCurrentSong={setCurrentSong}
            currentPlayer={currentPlayer}
            setCurrent={setCurrent}
            getIndexThree={getIndexThree}
            songData={genreSongList}
            genreClickCount={genreClickCount}
            prevClickCount={prevClickCount}
            clickedGenre={clickedGenre}
          />
        </div>
      </div> */}

      <div className="genreContainer">
        {genreList.map((genre, index) => (
          <button
            key={index}
            className="genre1"
            onClick={(event) => {
              DashAudioControls.onPlayPauseClick = false;
              let { innerHTML } = event.target;
              handleGenreClick(innerHTML);
            }}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="musicPlayer">
        <div className="main-items">
          <DashboardPlayerOne
            isOnePlaying={isOnePlaying}
            getOne={getOne}
            setCurrentSong={setCurrentSong}
            currentPlayer={currentPlayer}
            setCurrent={setCurrent}
            getIndexOne={getIndexOne}
            songData={genreSongList}
            genreClickCount={genreClickCount}
            prevClickCount={prevClickCount}
            clickedGenre={clickedGenre}
          />
        </div>
        <div className="main-items">
          <DashboardPlayerTwo
            isTwoPlaying={isTwoPlaying}
            getTwo={getTwo}
            setCurrentSong={setCurrentSong}
            currentPlayer={currentPlayer}
            setCurrent={setCurrent}
            getIndexTwo={getIndexTwo}
            songData={genreSongList}
            genreClickCount={genreClickCount}
            prevClickCount={prevClickCount}
            clickedGenre={clickedGenre}
          />
        </div>
        <div className="main-items">
          <DashboardPlayerThree
            isThreePlaying={isThreePlaying}
            getThree={getThree}
            setCurrentSong={setCurrentSong}
            currentPlayer={currentPlayer}
            setCurrent={setCurrent}
            getIndexThree={getIndexThree}
            songData={genreSongList}
            genreClickCount={genreClickCount}
            prevClickCount={prevClickCount}
            clickedGenre={clickedGenre}
          />
        </div>
      </div>
    </div>
  );
};

export default DashCarousel;
