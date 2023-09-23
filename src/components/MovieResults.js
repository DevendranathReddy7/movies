import { useState } from "react"
import WatchedMovies from "./WatchedMovies"

const MovieResults = ({ moviesFound, movieId }) => {
    const [isOpen1, setIsOpen1] = useState(true)

    const handleSelectedMovie = (id) => {
        movieId(id)
    }
    return (
        <>
            <div className="box">
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen1((open) => !open)}
                >
                    {isOpen1 ? "–" : "+"}
                </button>
                {isOpen1 && (
                    <ul className="list">
                        {moviesFound?.map((movie) => (
                            <li key={movie.imdbID} onClick={() => handleSelectedMovie(movie.imdbID)}>
                                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                                <h3>{movie.Title}</h3>
                                <div>
                                    <p>
                                        <span>📆</span>
                                        <span>{movie.Year}</span>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default MovieResults