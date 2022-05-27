import React, { useEffect, useState } from "react"
// import dojacat from "../assets/dojacat.jpg";
// import audien from "../assets/audien.jpg";
// import aliciakeys from "../assets/aliciakeys.jpg"
import "./styles/DashboardPlayer.css"

// import * as BsIcons from "react-icons/bs";
// import styled from "styled-components";

import DashAudio from "./DashAudio"
// import DashTracks from "./DashTracks";

// import Playlist from "../pages/Playlists";

// const { title, artist, color, image, audioSrc } = tracks;

// const songs = [
//   {
//     image: dojacat,
//     title: "Song 1",
//     artist: "Doja Cat",
//   },
//   {
//     image: audien,
//     title: "Song 2",
//     artist: "Audien",
//   },
//   {
//     image: aliciakeys,
//     title: "Song 3",
//     artist: "Alicia Keys",
//   },
// ];

const DashboardPlayer = ({ sdata }) => {
    const [songs, setSongs] = useState([
        // {
        //   _id: "",
        //   title: "",
        //   genre: "",
        //   id: "",
        //   year: "",
        //   filename: "",
        //   link: "",
        // },
    ])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const songData = await fetch("/songs", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })

                const songList = await songData.json()

                setSongs(songList)
                setIsLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        fetchSongs()
    }, [])

    return isLoading ? (
        "loading"
    ) : (
        //   <CardWrapper className="card-wrapper">

        <div className="DashPlayer">
            {/* <h1>Playlist created by user</h1> */}
            <DashAudio tracks={songs} sdata={sdata} />
            {/* <div className="Playlist-container">
        <div className="">
              <img className="" src={ablum} alt='album cover' />
          <div className="content">
            <h2 className="title">{title}</h2>
            <h3 className="artist">{artist}</h3>
          </div>
          <i className="trash icon" style={{color:'red', marginTop: '7px'}}></i>
      </div>
      </div> */}
        </div>
        //   </CardWrapper>
    )
}

// const DashMusicCard = () => {
//   return (
//     <CardWrapper className="card-wrapper">
//       {songs.map((song) => (
//         <div className="card" key={song.title}>
//           <ImageWrapper className="song-image-wrapper">
//             <BsIcons.BsPlayCircleFill className="music-play-btn" />
//             <img src={song.image} alt={song.title} />
//           </ImageWrapper>
//           <div className="song-description-wrapper">
//             <h4>{song.title}</h4>
//             <h5>{song.artist}</h5>
//           </div>
//         </div>
//       ))}
//     </CardWrapper>
//   );
// };

// const CardWrapper = styled.div``;

// const ImageWrapper = styled.div`
//   .music-play-btn {
//     position: relative;
//     top: 120px;
//     left: 75px;
//     color: var(--light);
//     font-size: 3rem;
//     z-index: 100;
//   }
// `;

export default DashboardPlayer
