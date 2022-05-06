import logo from "./logo.svg"
import { useState, useEffect } from "react"
import "./App.css"
import axios from "axios"

function App() {
    const [movies, setMovies] = useState([
        {
            title: "",
            genre: "",
            year: "",
        },
    ])

    const [movie, setMovie] = useState({
        title: "",
        genre: "",
        year: "",
    })

    useEffect(() => {
        async function fetchMovies() {
            const movieData = await fetch("/movies")

            const movieList = await movieData.json()
            setMovies(movieList)
        }
        fetchMovies()
    })

    function handleChange(event) {
        const { name, value } = event.target

        setMovie((prevInput) => {
            return {
                ...prevInput,
                [name]: value,
            }
        })
    }

    function addMovie(event) {
        event.preventDefault()
        const newMovie = {
            title: movie.title,
            genre: movie.genre,
            year: movie.year,
        }
        axios.post("/newmovie", newMovie)

        console.log("movie added")
    }

    return (
        <div className="App">
            <h1>Add Movie</h1>
            <form>
                <input
                    onChange={handleChange}
                    name="title"
                    value={movie.title}
                ></input>
                <input
                    onChange={handleChange}
                    name="genre"
                    value={movie.genre}
                ></input>
                <input
                    onChange={handleChange}
                    name="year"
                    value={movie.year}
                ></input>
                <button onClick={addMovie}>ADD MOVIE</button>
            </form>
            {movies.map((movie) => {
                console.log(movie)
                return (
                    <div>
                        <h1>Title: {movie.title}</h1>
                        <p>Year: {movie.year}</p>
                        <p>Genre: {movie.genre}</p>
                        <button>DELETE</button>
                    </div>
                )
            })}
        </div>
    )
}

export default App
