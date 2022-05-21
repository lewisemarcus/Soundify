import React, { useContext } from "react";
import "./styles/LandingPage.css";
import { Hero } from "../components";
import { CarouselMusic } from "../components/Carousel";
import Dashboard from "../components/Dashboard/Dashboard";
import { AuthContext } from "../context/authContext";
// import Footer from "../components/Footer";

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="landing-page-wrapper">
      {user ? (
        <>
          <Dashboard />
        </>
      ) : (
        <>
          <Hero />
          <CarouselMusic />
        </>
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
