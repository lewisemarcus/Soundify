import { Carousel } from "antd";
import DashMusicCard from "./DashMusicCard";
import "./styles/DashCarousel.css";

const DashCarousel = () => {
  const username = localStorage.getItem("username");

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h2>Welcome, {username.charAt(0).toUpperCase() + username.slice(1)}</h2>
      </div>
      <div className="searchContainer">
        <input typeof="text" placeholder="Search Songs" id="searchBar"></input>
        <button id="searchBtn">Search</button>
      </div>
      <Carousel autoplay dotPosition="left">
        <div className="carousel-items">
          <DashMusicCard />
        </div>
        <div className="carousel-items">
          <DashMusicCard />
        </div>
        <div className="carousel-items">
          <DashMusicCard />
        </div>
      </Carousel>

      <div className="genreContainer">
        <button className="genre1">Rock</button>
        <button className="genre1">R&B</button>
        <button className="genre1">Hiphop</button>
        <button className="genre1">EDM</button>
        <button className="genre1">Pop</button>
        <button className="genre1">Classical</button>
      </div>
    </div>
  );
};

export default DashCarousel;
