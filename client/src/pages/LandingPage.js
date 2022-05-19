import React, { useContext } from "react";
import "./styles/LandingPage.css";
import { Hero } from "../components";
import { CarouselMusic } from "../components/Carousel";
import  DashCarousel  from "../components/DashCarousel";
import { AuthContext } from "../context/authContext";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const username = localStorage.getItem("username");
  return (
    <div className="landing-page-wrapper">
      {user ? (
        <>
          <h1 className="user-name">Welcome, {username}</h1>
          <DashCarousel />
        </>
      ) : (
        <>
          <Hero />
          <CarouselMusic />
        </>
      )}
    </div>
  );
};

export default LandingPage;
