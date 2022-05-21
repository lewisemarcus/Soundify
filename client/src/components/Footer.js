import React from "react";
import ReactPlayer from "react-player/lazy";

const Footer = () => {
  return (
    // this link needs to be changed upon new click
    <div className="footer-container">
      <ReactPlayer
        url="https://soundclone-music.s3.amazonaws.com/qwe"
        controls="true"
      />
    </div>
  );
};
export default Footer;
