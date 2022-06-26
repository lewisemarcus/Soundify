import React, { useContext } from "react";
import "./styles/LandingPage.css";
import { Hero } from "../components";
import Dashboard from "../components/Dashboard/Dashboard";
import { AuthContext } from "../context/authContext";
import landingPageImg from "../assets/landingPage.svg";
import Dashboard2 from "../components/Dashboard/Dashboard2";
// import landingPageImg from "../assets/landingPage2.svg";

const LandingPage = ({
  setDashSearchResults,
  setCurrentSong,
  setAudioR,
  genreClickCount,
  setGenreClickCount,
  setAudioList,
  setPrevCount,
  currentPlayer,
  isOnePlaying,
  getOne,
  isTwoPlaying,
  getTwo,
  isThreePlaying,
  getThree,
  currentEvent,
  setCurrent,
  getSongInfo,
  getTrackIndex,
}) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <>
          {/* <Dashboard
                                getSongInfo={getSongInfo}
                                getTrackIndex={getTrackIndex}
                                currentEvent={currentEvent}
                                setCurrent={setCurrent}
                                isOnePlaying={isOnePlaying}
                                getOne={getOne}
                                isTwoPlaying={isTwoPlaying}
                                getTwo={getTwo}
                                isThreePlaying={isThreePlaying}
                                getThree={getThree}
                                currentPlayer={currentPlayer}
                                setPrevCount={setPrevCount}
                                setAudioList={setAudioList}
                                genreClickCount={genreClickCount}
                                setGenreClickCount={setGenreClickCount}
                                setAudioR={setAudioR}
                                setCurrentSong={setCurrentSong}
                                setDashSearchResults={setDashSearchResults}
                            /> */}
          <Dashboard2 />
        </>
      ) : (
        <div className="landing-page-wrapper">
          <Hero />
          <div className="landing-img-container">
            <img src={landingPageImg} alt="Landing Page Image" />
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
