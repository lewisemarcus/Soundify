import p5 from "p5"
import "../utils/p5/addons/p5.sound.js"
const SongDetailsPlayer = (songLink, app, image) => {
    const sketch = (p) => {
        let fft, canvas, mySound, wave, w, amp, myImage

        p.preload = async () => {
            myImage = await p.loadImage(image)
            mySound = await p.loadSound(songLink)
        }

        p.setup = () => {
            p.rectMode(p.CENTER)
            p.angleMode(p.DEGREES)
            canvas = p.createCanvas(800, 300)
            p.noFill()
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
                setTimeout(function () {
                    Object.assign(mySound, { _playing: true })
                    mySound.playMode("restart")
                }, 100)
                mySound.stop()
                mySound.playMode("sustain")
                mySound.play()
                mySound.jump(hpos)
            }
        }
        p.draw = () => {
            //mySound loads in draw
            let amplitude = amp.getLevel()
            amplitude = p.map(amplitude, 0, 0.5, 127, 255)
            p.background(myImage)
            p.scale(1)
            p.beginShape()
            p.stroke(255)

            //SPECTRUM STYLE ONE
            let spectrum = fft.analyze()

            const invertedSpectrum = spectrum.slice().reverse()
            const values = invertedSpectrum.concat(spectrum)

            for (let i = 0; i < values.length; i++) {
                p.fill(values[i], values[i] / 10, 0)
                let x = p.map(i, 0, values.length, 0, p.width)
                let y = p.map(values[i], 0, 255, 0, p.height / 8)
                if (i % 2 === 0) y *= -1
                p.curveVertex(x, -100 + y + p.height / 2)
            }
            p.strokeWeight(1)
            let hpos = p.map(
                mySound.currentTime(),
                0,
                mySound.duration(),
                0,
                p.width,
            )

            //WAVEFORM STYLE
            p.strokeWeight(2)
            for (let i = 0; i < wave.length; i++) {
                if (i * w <= hpos) {
                    p.stroke(200, 0, 0 /*amplitude*/)
                } else {
                    p.stroke(255, 255, 255 /*amplitude*/)
                }
                let peak = wave[i]
                let l = p.map(peak, -1, 1, -50, 50)

                p.line(i * w, p.height / 1.5 + l, i * w, p.height / 1.5 - l)
            }

            p.strokeWeight(1)
            p.stroke(200, 0, 0)
            p.line(hpos, 150, hpos, p.height / 1.2)

            p.endShape()
        }
    }

    return new p5(sketch, app.current)
}

export default SongDetailsPlayer
