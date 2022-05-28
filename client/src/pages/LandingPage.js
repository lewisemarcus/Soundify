import React, { useContext } from "react";
import "./styles/LandingPage.css";
import { Hero } from "../components";
import Dashboard from "../components/Dashboard/Dashboard";
import { AuthContext } from "../context/authContext";

const LandingPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <>
          <Dashboard />
        </>
      ) : (
        <div className="landing-page-wrapper">
          <Hero />
        </div>
      )}
      
    </>
  );
};

export default LandingPage;
