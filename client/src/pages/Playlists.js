import { useState, useEffect } from "react"
import AudioPlayerContainer from "../components/MusicPlayer/AudioPlayerContainer";
import { AiFillCloseCircle } from "react-icons/ai";
import "./styles/Playlists.css"
import { Row, Col } from "antd"
import { useQuery, useLazyQuery } from "@apollo/client"
import { qrySongs, GET_USER_PLAYLIST } from "../utils/queries/songQueries"
import { useLocation } from "react-router-dom"

const Playlists = ({ currentPlayer, setCurrentSong  }) => {
  const { loading, data } = useQuery(qrySongs)
  const [playlistSong, setPlaylistSong] = useState()
  const [selectedSong, setSelectedSong] = useState(false)
  const [newTitle, setTitle] = useState()
  const songs = data?.songs || [];
  const [r, setR] = useState(false)
  const location = useLocation()
  let audioList = []
  const username = localStorage.getItem("username")
  const { loading: playlistloading, data: userPlaylistsdata } = useQuery(GET_USER_PLAYLIST, {
    variables: { owner: username },
  },)

  const usersPlaylists = userPlaylistsdata?.userPlaylists || []

  const [userPlaylists, { loading: plloading, data: playlistData }] = useLazyQuery(GET_USER_PLAYLIST, {
    variables: { owner: username }
    // onCompleted: (playlistData) => { 
    //     localStorage.setItem("playlists", JSON.stringify(playlistData))
    //     return playlistData
    // }
},)
// localStorage.setItem("playlists", JSON.stringify(playlistData))
// let newlist = JSON.parse(localStorage.getItem("playlists")) newlist.userPlaylists[0]? newlist.userPlaylists[0] : [{title: "No Playlists", artist: "No Playlists", link: "No Playlists"}]
const [playlist, setPlaylist] = useState()
const [singlePL, setSinglePL] = useState()

useEffect(() => {
  async function loanPlists () {
  const plists = await userPlaylists()
  console.log(plists)
}
loanPlists()
})

useEffect(() => {
    async function loadplaylists() {
        let { data } = userPlaylists()
        setPlaylist(data)
    }
    loadplaylists()        
},[playlist, singlePL])

  const switchPlaylist = (e) => {
    e.preventDefault()
    for (let i = 0; i < playlist.userPlaylists.length; i++){
      console.log(e.currentTarget.id)
      if (playlist.userPlaylists[i]._id === e.currentTarget.id){
        setSinglePL(playlist.userPlaylists[i])
    }}
  }
  
  
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

  return (
    <div>
      <aside className="playlistNames">
        <h2>Playlists:</h2>
        {usersPlaylists.map((playlist, index) => {
          return <button id={playlist._id} onClick={switchPlaylist} className="playlist-List">{playlist.plTitle}</button>
        })}
      </aside>
      <div className="Playlist-container">
        <AudioPlayerContainer
          playlistSong={playlistSong}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          newTitle={newTitle}
          r={r}
          setR={setR}
          currentPlayer={currentPlayer}
          setCurrentSong={setCurrentSong}
          singlePL={singlePL}
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
            {singlePL.songs.map((song, index) => {
              console.log(song)
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
