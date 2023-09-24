import { useState } from "react"

const WatchedMovies = ({ movieResults, userRate }) => {
    const [isOpen2, setIsOpen2] = useState(true)
    const [watchedMovies, setWatchedMovies] = useState(movieResults)

    const deleteMovieFromWatched = (id) => {
        const movies = watchedMovies.filter(movie => movie.imdbID !== id)
        setWatchedMovies(movies)
    }

    return (
        <>
            <div>
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen2((open) => !open)}
                >
                    {isOpen2 ? "–" : "+"}
                </button>
                {isOpen2 && (
                    <>
                        <div className="summary">
                            <h2>Movies you watched</h2>
                        </div>

                        <ul className="list">
                            {watchedMovies?.map((movie) =>
                                < li key={movie.imdbID} >

                                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                                    <h3>{movie.Title}</h3>
                                    <div>
                                        <p>
                                            <span>📆</span>
                                            <span>{movie.Year}</span>
                                        </p>
                                        <p>
                                            <span>⭐️</span>
                                            <span className="span-rating">{movie.imdbRating}</span>
                                            {/* <span className="span-rate2">Ratings are in below format:<strong>Your Rating/IMDB Rating</strong></span> */}
                                        </p>
                                        <p>
                                            <span>⏳</span>
                                            <span>{movie.Runtime}</span>
                                        </p>
                                        <h4 onClick={() => deleteMovieFromWatched(movie.imdbID)}>❌</h4>
                                    </div>
                                </li>)}
                        </ul>
                    </>
                )}
            </div >
        </>
    )

}
export default WatchedMovies