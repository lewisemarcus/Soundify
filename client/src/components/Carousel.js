import { Carousel } from "antd";
import MusicCard from "./MusicCard";
import "./styles/Carousel.css";

export const CarouselMusic = () => (
  <div className="carousel-container">
    <div className="carousel-header">
      <h2>Here are some of the trending songs. Sign up or login to listen!</h2>
    </div>
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
  </div>
);
