import React from "react";
import dojacat from "../assets/dojacat.jpg";
import "./styles/MusicCard.css";
import * as BsIcons from "react-icons/bs";
import styled from "styled-components";

const songs = [
  {
    image: dojacat,
    title: "Song 1",
    artist: "Doja Cat",
  },
  {
    image: dojacat,
    title: "Song 2",
    artist: "Doja Cat",
  },
  {
    image: dojacat,
    title: "Song 3",
    artist: "Doja Cat",
  },
  {
    image: dojacat,
    title: "Song 4",
    artist: "Doja Cat",
  },
  {
    image: dojacat,
    title: "Song 5",
    artist: "Doja Cat",
  },
];

const MusicCard = () => {
  return (
    <CardWrapper className="card-wrapper">
      {songs.map((song) => (
        <div className="card" key={song.title}>
          <ImageWrapper className="song-image-wrapper">
            <BsIcons.BsPlayCircleFill className="music-play-btn" />
            <img src={song.image} alt={song.title} />
          </ImageWrapper>
          <div className="song-description-wrapper">
            <h4>{song.title}</h4>
            <h5>{song.artist}</h5>
          </div>
        </div>
      ))}
    </CardWrapper>
  );
};

const CardWrapper = styled.div``;

const ImageWrapper = styled.div`
  .music-play-btn {
    position: relative;
    top: 120px;
    left: 75px;
    color: var(--light);
    font-size: 3rem;
    z-index: 100;
  }
`;

export default MusicCard;
