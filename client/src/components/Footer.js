import React from "react";
import FooterAudioPlayer from "./FooterPlayer/FooterAudioPlayer";
import Footertracks from "./FooterPlayer/Footertracks"

const Footer = () => {
  return (
    // this link needs to be changed upon new click
    <div className="footer-container">
      <FooterAudioPlayer tracks={Footertracks} />
    </div>
  );
};
export default Footer;
