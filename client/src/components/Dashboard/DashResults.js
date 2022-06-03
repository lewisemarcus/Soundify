import "./styles/DashResults.css";
import { useEffect } from "react";

const DashResults = ({ dashSearchResults }) => {
  useEffect(() => {
    console.log(dashSearchResults);
  });

  const handleSearchClick = (event) => {
    // event.currentTarget.name;
    console.log(event.currentTarget.name)
  }


  console.log(dashSearchResults)
  return (
    
    <div className="searchResults">
        <div className="subResults">
          {dashSearchResults.map((song, index) => {
            return (
                <>
                <button className="resultsCard" id="resultsBtn" name={song._id} key={index} onClick={handleSearchClick}>
                <h1>Title: {song.title}</h1>
                <p>Artist: {song.artist}</p>
                <p>Genre: {song.genre}</p>
                {/* <p>Link: {song.link}</p> */}
                </button>
                </>
            );
          })}
        </div>
        {/* <div className="siDetailTexts">
            <span className="siTaxOp">Login to listen</span>
            <button className="siCheckButton">Listen Now</button>
          </div> */}
      
    </div>
  );
};

export default DashResults;
