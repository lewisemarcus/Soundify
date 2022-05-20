import p5 from "p5"
import "../utils/p5/addons/p5.sound.js"
const SongDetailsPlayer = (songLink, app) => {
    const sketch = (p) => {
        let fft, canvas, mySound, wave, background, distance, w, amp

        p.preload = () => {
            mySound = p.loadSound(songLink)
        }

        p.setup = () => {
            background = 255
            let playButton = p.createButton("Play")
            playButton.style("border-radius", "5px")
            playButton.id("button")
            playButton.mouseOver(() => {
                playButton.style("border-radius", "10px")
            })
            console.log("waddup", document.getElementById("button"))
            p.rectMode(p.CENTER)
            p.angleMode(p.DEGREES)
            canvas = p.createCanvas(800, 600)
            p.noFill()
            console.log(p.drawingContext.scale)

            canvas.style.marginBottom = 100
            p.getAudioContext()
            if (mySound)
                if (mySound.isLoaded()) wave = mySound.getPeaks(p.width)
            fft = new p5.FFT()
            amp = new p5.Amplitude()
            w = 3
            // p.noLoop()
        }
        p.mousePressed = (e) => {
            if (e.target.id === "button") {
                if (mySound.isPaused() || mySound.currentTime() === 0)
                    mySound.play()
                else mySound.pause()
            }
            if (e.target.id === "defaultCanvas0") {
                let hpos = p.constrain(p.mouseX, 0, p.width)
                hpos = p.map(hpos, 0, p.width, 0, mySound.duration())
                mySound.jump(hpos)
            }

            // let hpos = p.map(p.mouseX, 0, mySound.duration(), 0, p.width)

            // p.line(hpos, 0, hpos, p.height)
        }
        p.draw = () => {
            //mySound loads in draw
            let amplitude = amp.getLevel()
            amplitude = p.map(amplitude, 0, 0.5, 127, 255)

            p.scale(1)
            p.background(background)
            p.beginShape()
            p.stroke("#1d43ad")

            //SPECTRUM STYLE ONE
            let spectrum = fft.analyze()

            const invertedSpectrum = spectrum.slice().reverse()
            const values = invertedSpectrum.concat(spectrum)
            // distance = p.dist(p.mouseX, p.mouseY, 100, 100)

            // if (distance < 50) {
            //     background = 0
            // } else {
            //     background = 255
            // }

            for (var i = 0; i < values.length; i++) {
                p.fill(values[i], values[i] / 10, 0)
                var x = p.map(i, 0, values.length, 0, p.width)
                var y = p.map(values[i], 0, 255, 0, p.height / 8)
                if (i % 2 === 0) y *= -1
                p.curveVertex(x, 100 + y + p.height / 2)
            }
            p.strokeWeight(1)
            let hpos = p.map(
                mySound.currentTime(),
                0,
                mySound.duration(),
                0,
                p.width,
            )

            //WAVEFORM STYLE TWO
            p.strokeWeight(2)
            for (let i = 0; i < wave.length; i++) {
                if (i * w <= hpos) {
                    p.stroke(200, 0, 0 /*amplitude*/)
                } else {
                    p.stroke(29, 67, 173 /*amplitude*/)
                }
                let peak = wave[i]
                let l = p.map(peak, -1, 1, -50, 50)

                p.line(i * w, p.height / 4 + l, i * w, p.height / 4 - l)
            }

            p.strokeWeight(1)
            p.stroke(200, 0, 0)
            p.line(hpos, 105, hpos, p.height / 3)

            p.endShape()
        }
    }

    return new p5(sketch, app.current)
}

export default SongDetailsPlayer
