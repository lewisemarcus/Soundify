// import "./styles/DashResults.css";
import { useEffect } from "react";

const DashResults = ({ dashSearchResults }) => {
  useEffect(() => {
    console.log(dashSearchResults);
  });

  return (
    <div className="searchResults">
      <div className="siDetails">
        <div className="siRating">
          {dashSearchResults.map((song, index) => {
            return (
              <div key={index}>
                <h1>Title: {song.title}</h1>
                <p>Artist: {song.artist}</p>
                <p>Genre: {song.genre}</p>
                <p>Link: {song.link}</p>
              </div>
            );
          })}
        </div>
        {/* <div className="siDetailTexts">
            <span className="siTaxOp">Login to listen</span>
            <button className="siCheckButton">Listen Now</button>
          </div> */}
      </div>
    </div>
  );
};

export default DashResults;
