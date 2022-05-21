// import { Carousel } from "antd";
import { Row, Col } from 'antd';
import DashboardPlayer from "./DashboardPlayer";
import "./styles/Dashboard.css";

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
      <div className="musicPlayer">
      <Row>
      <Col span={8} className="carousel-items"> <DashboardPlayer /> </Col>
      <Col span={8} className="carousel-items"> <DashboardPlayer /> </Col>
      <Col span={8} className="carousel-items"> <DashboardPlayer /> </Col>
    </Row>
        {/* <div className="carousel-items">
          <DashMusicCard />
        </div>
        <div className="carousel-items">
          <DashMusicCard />
        </div>
        <div className="carousel-items">
          <DashMusicCard />
        </div> */}
        </div>

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
