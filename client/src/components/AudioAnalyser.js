import React, { useEffect } from "react"

const AudioAnalyzer = (props) => {
    useEffect(() => {
        const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)()
        let audio = props.value
        audio.src = props.link
        const analyser = audioContext.createAnalyser()
        const dataArray = new Uint8Array(analyser.frequencyBinCount)
        const audioSource = audioContext.createMediaElementSource(audio)
    })
}

export default AudioAnalyzer
