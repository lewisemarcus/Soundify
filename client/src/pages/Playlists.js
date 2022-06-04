import { useState, useEffect } from "react"
import AudioPlayerContainer from "../components/MusicPlayer/AudioPlayerContainer";
import { AiFillCloseCircle } from "react-icons/ai";
import "./styles/Playlists.css"
import { Row, Col } from "antd"
import { useQuery } from "@apollo/client"
import { qrySongs } from "../utils/queries/songQueries"
import { useLocation } from "react-router-dom"

const Playlists = () => {
  const { loading, data } = useQuery(qrySongs)
  const [playlistSong, setPlaylistSong] = useState()
  const [selectedSong, setSelectedSong] = useState(false)
  const [newTitle, setTitle] = useState()
  const songs = data?.songs || [];
  const [r, setR] = useState(false)
  const location = useLocation()
  let audioList = []
  // console.log(songs)

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (setPlaylistSong !== undefined && selectedSong !== undefined) {
      setSelectedSong(true)
      setPlaylistSong(e.currentTarget.name)
      setTitle(e.currentTarget.title)
      let title = e.currentTarget.parentNode
      let find = document.querySelectorAll('.active')
      find.forEach((find) => {
        find.classList.remove('active')
      })
      title.classList.add("active")
      setR(true)
    }
  }
  // console.log(newTitle)
  
  // useEffect(() => {
  //   if (location.pathname.split("/") !== "")
  //       if (audioList[0] !== undefined)
  //           for (let each in audioList) audioList[each].pause()
  // }, [location.pathname, currentPlayer.current.src])

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
          newTitle={newTitle}
          r={r}
          setR={setR}
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
                <Row>
                  <button name={song.link} title={song.title} onClick={handleClick}><Col span={8}><h2 className="playlist-header">{song.title}</h2></Col></button>
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
