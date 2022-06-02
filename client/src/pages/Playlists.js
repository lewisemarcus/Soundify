import AudioPlayerContainer from "../components/MusicPlayer/AudioPlayerContainer";
import { AiFillCloseCircle } from "react-icons/ai";
import "./styles/Playlists.css"
import { Row, Col } from "antd"

const Playlists = (props) => {
  const {title, artist, filename, year, genre, _id, link} = props.tracks
  
  return (
    <div style={{ height: '100vh' }}>
      <h1>Playlist created by user</h1>
      <div className="Playlist-container">
        <AudioPlayerContainer />
        <div className="item">
          <div className="content">
            <h2 className="playlist-title">Playlist Name:</h2>
            <div className="headers">
              <Row>
                <Col span={8}><h2 className="playlist-header">Title</h2></Col>
                <Col span={8}><h2 className="playlist-header">Artist</h2></Col>
                <Col span={8}><h2 className="playlist-header">Remove</h2></Col>
              </Row>
            </div>
            <Row>
              <Col span={8}><h2 className="playlist-header">{title}</h2></Col>
              <Col span={8}><h2 className="playlist-header">{artist}</h2></Col>
              <Col span={8}><i className="trashcan" style={{ color: 'red', marginTop: '7px' }}><AiFillCloseCircle /></i></Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
