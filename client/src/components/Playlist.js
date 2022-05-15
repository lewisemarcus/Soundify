import "./styles/Playlist.css";
import Audien from "../assets/audien.jpg";
import Dojacat from "../assets/dojacat.jpg";
import Blink182 from "../assets/blink182.jpg";
import Queen from "../assets/queen.jpg";
import Dvorak from "../assets/dvorak.jpg";
import Aliciakeys from "../assets/aliciakeys.jpg";
const Playlist = () => {
  return (
    <>
      <div className="searchItem">
        <img src={Audien} alt="" className="siImg" />
        <div className="siDesc">
          <h1 className="siTitle">Audien</h1>
          <span className="siDistance">
            Album: <span id="albumName">DayDreams</span>
          </span>
          <span className="siTaxiOp">
            Release Date: <span id="releaseDate">August 28, 2015</span>
          </span>
          <span className="siSubtitle">
            Genre: <span id="genre">Dance/Electronic</span>
          </span>
          <span className="siFeatures">
            Label: <span id="label">Astralwerks</span>
          </span>
          <span className="siCancelOp">
            Featuring: <span id="featuring">Lady A</span>
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
          <span id="rating">Very Popular</span>
            <button id="ratingNum">9.2</button>
          </div>
          <div className="siDetailTexts">
            <span className="siTaxOp">Login to listen</span>
            <button className="siCheckButton">Listen Now</button>
          </div>
        </div>
      </div>

      <div className="searchItem">
        <img src={Dojacat} alt="" className="siImg" />
        <div className="siDesc">
          <h1 className="siTitle">Doja Cat</h1>
          <span className="siDistance">
            Album: <span id="albumName">Planet Her</span>
          </span>
          <span className="siTaxiOp">
            Release Date: <span id="releaseDate">June 25, 2021</span>
          </span>
          <span className="siSubtitle">
            Genre: <span id="genre">Pop/R&B/Hiphop</span>
          </span>
          <span className="siFeatures">
            Label: <span id="label">Kemosabe · RCA</span>
          </span>
          <span className="siCancelOp">
            Featuring: <span id="featuring">Yeti Beats</span>
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
          <span id="rating">Very Popular</span>
            <button id="ratingNum">9.7</button>
          </div>
          <div className="siDetailTexts">
            <span className="siTaxOp">Login to listen</span>
            <button className="siCheckButton">Listen Now</button>
          </div>
        </div>
      </div>

      <div className="searchItem">
        <img src={Blink182} alt="" className="siImg" />
        <div className="siDesc">
          <h1 className="siTitle">Blink-182</h1>
          <span className="siDistance">
            Album: <span id="albumName">Enema of the State</span>
          </span>
          <span className="siTaxiOp">
            Release Date: <span id="releaseDate">June 1, 1999</span>
          </span>
          <span className="siSubtitle">
            Genre: <span id="genre">Pop-punk/Skate-punk</span>
          </span>
          <span className="siFeatures">
            Label: <span id="label">MCA</span>
          </span>
          <span className="siCancelOp">
            Featuring: <span id="featuring">Blink-182</span>
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span id="rating">90's Favorite</span>
            <button id="ratingNum">9.5</button>
          </div>
          <div className="siDetailTexts">
            <span className="siTaxOp">Login to listen</span>
            <button className="siCheckButton">Listen Now</button>
          </div>
        </div>
      </div>

      <div className="searchItem">
        <img src={Queen} alt="" className="siImg" />
        <div className="siDesc">
          <h1 className="siTitle">Queen</h1>
          <span className="siDistance">
            Album: <span id="albumName">A Night at the Opera</span>
          </span>
          <span className="siTaxiOp">
            Release Date: <span id="releaseDate">November 21, 1975</span>
          </span>
          <span className="siSubtitle">
            Genre: <span id="genre">Hard-rock/Avant-pop</span>
          </span>
          <span className="siFeatures">
            Label: <span id="label">EMI · Elektra</span>
          </span>
          <span className="siCancelOp">
            Featuring: <span id="featuring">Queen</span>
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span id="rating">70's Favorite</span>
            <button id="ratingNum">9.1</button>
          </div>
          <div className="siDetailTexts">
            <span className="siTaxOp">Login to listen</span>
            <button className="siCheckButton">Listen Now</button>
          </div>
        </div>
      </div>

      <div className="searchItem">
        <img src={Aliciakeys} alt="" className="siImg" />
        <div className="siDesc">
          <h1 className="siTitle">Alicia Keys</h1>
          <span className="siDistance">
            Album: <span id="albumName">Songs in A Minor</span>
          </span>
          <span className="siTaxiOp">
            Release Date: <span id="releaseDate">June 5, 2001</span>
          </span>
          <span className="siSubtitle">
            Genre: <span id="genre">Neo-soul/R&B</span>
          </span>
          <span className="siFeatures">
            Label: <span id="label">J</span>
          </span>
          <span className="siCancelOp">
            Featuring: <span id="featuring">Brian McKnight</span>
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span id="rating">90's Favorite</span>
            <button id="ratingNum">9.5</button>
          </div>
          <div className="siDetailTexts">
            <span className="siTaxOp">Login to listen</span>
            <button className="siCheckButton">Listen Now</button>
          </div>
        </div>
      </div>

      <div className="searchItem">
        <img src={Dvorak} alt="" className="siImg" />
        <div className="siDesc">
          <h1 className="siTitle">Dvorak</h1>
          <span className="siDistance">
            Album: <span id="albumName">Brilliant Classics</span>
          </span>
          <span className="siTaxiOp">
            Release Date: <span id="releaseDate">December 8, 1881</span>
          </span>
          <span className="siSubtitle">
            Genre: <span id="genre">Classical</span>
          </span>
          <span className="siFeatures">
            Label: <span id="label">Prague Supraphon</span>
          </span>
          <span className="siCancelOp">
            Featuring: <span id="featuring">Domov muj</span>
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span id="rating">Top Classical</span>
            <button id="ratingNum">9.7</button>
          </div>
          <div className="siDetailTexts">
            <span className="siTaxOp">Login to listen</span>
            <button className="siCheckButton">Listen Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlist;
