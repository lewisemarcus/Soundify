import React, { useContext } from "react";
import "./styles/LandingPage.css";
import { Hero } from "../components";
import Carousel from "../components/Carousel";
import { AuthContext } from "../context/authContext";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const username = localStorage.getItem("username");
  return (
    <div className="landing-page-wrapper">
      {user ? (
        <>
          <h1 className="user-name">Welcome, {username}</h1>
          <Carousel />
        </>
      ) : (
        <>
          <Hero />
          <Carousel />
        </>
      )}
    </div>
  );
};

export default LandingPage;
