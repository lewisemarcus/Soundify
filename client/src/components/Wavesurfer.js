import React, { useState, useEffect, useRef } from "react"
import WaveSurfer from "wavesurfer.js"
import { BsFillPlayFill } from "react-icons/bs"
import { BsPauseFill } from "react-icons/bs"
import { PlayButton } from "./styles/Wavesurfer.styled"

import "./styles/Slider.css"

const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "#eee",
    progressColor: "#ec994b",
    cursorColor: "#ec994b",
    barWidth: 5,
    backend: "MediaElement",
    scrollParent: true,
    barRadius: 3,
    responsive: true,
    height: 100,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
})

let duration,
    currentTime,
    hDisplay,
    mDisplay,
    sDisplay,
    chDisplay,
    cmDisplay,
    csDisplay,
    h,
    m,
    s,
    ch,
    cm,
    cs

export default function Waveform({
    song,
    audio,
    setIsPlaying,
    isPlaying,
    isDetailsPlaying,
    querySong,
}) {
    const waveformRef = useRef(null)
    const wavesurfer = useRef(null)
    const time = useRef(null)
    // create new WaveSurfer instance
    // On component mount and when url changes
    useEffect(() => {
        const options = formWaveSurferOptions(waveformRef.current)
        wavesurfer.current = WaveSurfer.create(options)

        if (audio.current !== null && audio.current.src !== "") {
            let songUrl = new URL(audio.current.src).pathname.split("/")[1]
            if (audio.current.src !== undefined && songUrl !== "undefined") {
                console.log(audio.current.src)
                wavesurfer.current.load(querySong.link)
            }
        }
        wavesurfer.current.on("waveform-ready", function () {
            // https://wavesurfer-js.org/docs/methods.html
            //wavesurfer.current.play()
            //setIsPlaying(true)
            // audio.current.play()

            // make sure object still available when file loaded
            if (wavesurfer.current) {
                duration = wavesurfer.current.getDuration()
                h = Math.floor(duration / 3600)
                m = Math.floor((duration % 3600) / 60)
                s = Math.floor((duration % 3600) % 60)

                hDisplay = h > 0 ? h + (h === 1 ? ":" : ":") : ""
                mDisplay = m > 0 ? m + (m === 1 ? ":" : ":") : "00:"
                sDisplay = s < 10 ? "0" + s : s

                time.current.innerHTML = `${hDisplay}${mDisplay}${sDisplay}`
            }
        })

        wavesurfer.current.on("audioprocess", function () {
            currentTime = wavesurfer.current.getCurrentTime()
            if (currentTime === undefined) currentTime = 0
            ch = Math.floor(currentTime / 3600)
            cm = Math.floor((currentTime % 3600) / 60)
            cs = Math.floor((wavesurfer.current.getCurrentTime() % 3600) % 60)

            chDisplay = ch > 0 ? ch + (ch === 1 ? ":" : ":") : ""
            cmDisplay = cm > 0 ? cm + (cm === 1 ? ":" : ":") : "00:"
            csDisplay = cs < 10 ? "0" + cs : cs

            time.current.innerHTML = `${chDisplay}${cmDisplay}${csDisplay} / ${hDisplay}${mDisplay}${sDisplay}`
        })

        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => wavesurfer.current.destroy()
    }, [audio.current.src])

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying)
        isDetailsPlaying(!isPlaying)
        wavesurfer.current.playPause()
    }

    return (
        <div
            style={{
                width: "60%",
                display: "flex",
                margin: 10,
                marginBottom: 0,
            }}
        >
            <div
                className="controls"
                style={{
                    zIndex: 100,
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginRight: 10,
                }}
            >
                <PlayButton style={{ margin: 10 }} onClick={handlePlayPause}>
                    {!isPlaying ? <BsFillPlayFill /> : <BsPauseFill />}
                </PlayButton>
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
            >
                <div
                    id="waveform"
                    style={{ width: "100%", marginTop: 100 }}
                    ref={waveformRef}
                />
                <p style={{ color: "white" }} ref={time}></p>
            </div>
        </div>
    )
}
