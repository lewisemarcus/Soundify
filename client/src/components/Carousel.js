import { Carousel } from "antd";
import MusicCard from "./MusicCard";
import "./styles/Carousel.css";

export default () => (
  <Carousel autoplay dotPosition="left">
    <div className="carousel-items">
      <MusicCard />
    </div>
    <div className="carousel-items">
      <MusicCard />
    </div>
    <div className="carousel-items">
      <MusicCard />
    </div>
    <div className="carousel-items">
      <MusicCard />
    </div>
  </Carousel>
);
