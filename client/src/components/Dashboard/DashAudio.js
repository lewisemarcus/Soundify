import React, { useState, useEffect, useRef } from "react";
import DashAudioControls from "./DashAudioControls";
import DashBackDrop from "./DashBackDrop";
import "./styles/DashAudio.css";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const DashAudio = ({ tracks }) => {
  console.log(tracks)
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  

  // Destructure for conciseness
  const { title, filename, year, genre, _id, link } = tracks[trackIndex]
  // const { title, artist, color, image, audioSrc } = tracks[trackIndex];
  // const [audioRef.current, setMusicLink] = useState(new Audio(link))
  // Refs
  const audioRef = useRef(new Audio(link));
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;
  console.log(link, "initial load")

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(false);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {

    console.log(isPlaying, "Playing")
    console.log(audioRef.current, "audioRef")
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {

    audioRef.current.pause();

    
   audioRef.current = new Audio(link);
    console.log(audioRef.current)

    setTrackProgress(audioRef.current.currentTime);
console.log(isReady, "ready load")
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
    
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-play">
      <div className="track-information">
        <img
          className="aw"
          // for future album covers
          // src={image}
          alt={`track artwork for ${title} by ${filename}`}
        />
        {/* <h2 className="title">{title}</h2>
        <h3 className="artist">{filename}</h3> */}
        <br></br>
        <br></br>
        <DashAudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          // time={currentTime}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      <DashBackDrop
        trackIndex={trackIndex}
        // activeColor={color}
        isPlaying={isPlaying}
      />
      </div>
    </div>
  );
};

export default DashAudio;
