import "./styles/Playlist.css";
import Audien from "../assets/audien.jpg";

const Playlist = () => {
  return (
    <div className="searchItem">
      <img src={Audien} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">Audien</h1>
        <span className="siDistance">Album: DayDreams</span>
        <span className="siTaxiOp">Release Date: August 28, 2015</span>
        <span className="siSubtitle">Genre: Dance/Electronic</span>
        <span className="siFeatures">Label: Astralwerks</span>
        <span className="siCancelOp">Featuring: Lady A </span>
        <span className="siCancelOpSubtitle">Featuring: Voyageur</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Very Popular</span>
          <button>9.2</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">$22.00</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
