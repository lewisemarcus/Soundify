import "./styles/DashResults.css";
import { PageHeader } from "antd";
import DashResultCard from "./DashResultCard";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const DashResults = ({
  dashSearchResults,
  setCurrentSong,
  setOneSongClick,
  currentPlayer,
  setIsPlaying,
  getSongInfo,
}) => {
  let searchResults =
    dashSearchResults || JSON.parse(localStorage.getItem("searchResults"));
  const navigate = useNavigate();
  const searchResult = localStorage.getItem("searchResult");

  return (
    <div className="dash-result-container">
      <PageHeader
        className="site-page-header"
        onBack={() => {
          navigate("/");
        }}
        title={`Search results for "${searchResult}"`}
      />
      {searchResults.length === 0 && (
        <div className="no-result-container">
          <SearchIcon style={{ fontSize: "7rem" }} className="no-result-icon" />
          <h2 className="no-result">{`Sorry, there were no results for "${searchResult}"`}</h2>
        </div>
      )}
      {searchResults.map((searchItem) => (
        <DashResultCard
          getSongInfo={getSongInfo}
          setIsPlaying={setIsPlaying}
          setCurrentSong={setCurrentSong}
          dashSearchResults={searchItem}
          setOneSongClick={setOneSongClick}
          currentPlayer={currentPlayer}
        />
      ))}
    </div>
  );
};

export default DashResults;
