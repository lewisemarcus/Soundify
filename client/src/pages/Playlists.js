import AudioPlayerContainer from "../components/MusicPlayer/AudioPlayerContainer";
import { AiFillCloseCircle } from "react-icons/ai";
import "./styles/Playlists.css"
import { Row, Col } from "antd"
import { useQuery } from "@apollo/client"
import { qrySongs } from "../utils/queries/songQueries"

const Playlists = () => {
  
  const { loading, data } = useQuery(qrySongs)

  const songs = data?.songs || [];
  console.log(songs)

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
            {songs.map((song, index) => {
            return (
              <div className="playlistCard" key={index}>
                <Row style={{color: 'white'}}>
                  <Col span={8}><h2 className="playlist-header">{song.title}</h2></Col>
                  <Col span={8}><h2 className="playlist-header">{song.artist}</h2></Col>
                  <Col span={8}>
                    <button id="removeBtn">
                      <i className="trashcan" style={{ color: 'red', marginTop: '7px' }}><AiFillCloseCircle /></i>
                    </button>
                  </Col>
                </Row>
              </div>
            );
          })}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
