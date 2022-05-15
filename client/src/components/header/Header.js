import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <div id="icons">🎵</div>
            <span>Songs</span>
          </div>

          <div className="headerListItem active">
            <div id="icons1">🎶</div>
            <span>Playlists</span>
          </div>

          <div className="headerListItem active">
            <div id="icons">🎼</div>
            <span>Genre</span>
          </div>
        </div>
        <h1 className="headerTitle">Listen/Jive/Relax - Musical Sharing</h1>
        <p className="headerDesc">
          Upload your musical creations and listen in on others musical works!
        </p>
        {/* <button className="headerBtn">Sign in / Register</button> */}
      </div>
    </div>
  );
};

export default Header;
