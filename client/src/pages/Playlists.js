import { useState } from "react"
import AudioPlayerContainer from "../components/MusicPlayer/AudioPlayerContainer";
import { AiFillCloseCircle } from "react-icons/ai";
import "./styles/Playlists.css"
import { Row, Col } from "antd"
import { useQuery } from "@apollo/client"
import { qrySongs } from "../utils/queries/songQueries"

const Playlists = () => {
  const [active, setActive] = useState(false)
  const { loading, data } = useQuery(qrySongs)
  const [playlistSong, setPlaylistSong] = useState()
  const [selectedSong, setSelectedSong] = useState(false)
  const songs = data?.songs || [];
  // console.log(songs)

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (setPlaylistSong !== undefined && selectedSong !== undefined) {
      setSelectedSong(true)
      setPlaylistSong(e.currentTarget.name)
      let title = e.currentTarget.parentNode
      let find = document.querySelectorAll('.active')
      find.forEach((find) => {
        console.log(title)
        find.classList.remove('active')
      })
      title.classList.add("active")
    }
  }

  return (
    <div>
      <aside className="plaaylistNames">
        <h2>Playlists</h2>
      </aside>
      <h1>Playlist created by user</h1>
      <div className="Playlist-container">
        <AudioPlayerContainer
          playlistSong={playlistSong}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
        />
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
                <Row className={`song`}>
                  <button name={song.link}  title={song.title} onClick={handleClick}><Col span={8}><h2 className="playlist-header">{song.title}</h2></Col></button>
                  <Col span={8}><h2 className="playlist-header">{song.artist}</h2></Col>
                  <Col span={8}>
                    <button id="removeBtn">
                      <i className="trashcan" style={{ color: 'red', marginTop: '7px' }}><AiFillCloseCircle /></i>
                    </button>
                  </Col>
                </Row>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
