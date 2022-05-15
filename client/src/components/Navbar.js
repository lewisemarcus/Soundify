import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { Button } from "@mui/material";
import "./styles/Navbar.css";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import Button from "./Button";

const Navbar = () => {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    window.location.reload();
    navigate("/");
  };

  return (
    <nav>
      <div>
        <Link to="/" className="logo">
          <FilterDramaIcon fontSize="large" /> <h3>SoundClone</h3>
        </Link>
      </div>
      <div className="button-wrapper">
        {user ? (
          <Button onClick={onLogout}>Logout</Button>
        ) : (
          <>
            {" "}
            <Link to="/login" className="link">
              <Button className="outline-btn">Login</Button>
            </Link>
            <Link to="/register" className="link">
              <Button className="solid-btn">Register</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
