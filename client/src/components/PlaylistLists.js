// import { Divider, List, Skeleton } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import orange from "../assets/orange.png";
import shakeygraves from "../assets/shakeygraves.jpg";
import "./styles/PlaylistList.css";

const PlaylistList = ({ data }) => {
  let navigate = useNavigate();

  const handleSongClick = (song) => {
    navigate(`/song/${song._id}`);
  };

  return (
    <div className="playlist-data-container">
      <div className="playlist-information-header">
        <img src={shakeygraves} alt="Shakey Graves" />
        <div>
          <h3>{data.plTitle}</h3>
          <h4>
            {data.songs.length === 1
              ? `${data.songs.length} song`
              : `${data.songs.length} songs`}
          </h4>
        </div>
      </div>

      {data.songs.map((song) => {
        return (
          <div
            className="playlist-song-row"
            onClick={() => handleSongClick(song)}
          >
            <div className="playlist-song-information">
              <img src={orange} alt="Album Cover" />
              <div className="playlist-song-text">
                <h4>{song.title}</h4>
                <h5>{song.artist}</h5>
                {/* <h6>{song.genre}</h6> */}
              </div>
            </div>
            <div>
              {/* <DeleteOutlined
                onClick={() => handleDelete(song)}
                style={{ fontSize: "1.2rem" }}
              /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistList;
