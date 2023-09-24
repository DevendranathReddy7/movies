import { useEffect, useState } from 'react'
import StarRating from './StarRating'
import WatchedMovies from './WatchedMovies'

const SelectedMovie = ({ selectedMovie, moviesFound, onClose }) => {
    const [movie, setMovie] = useState({})
    const [close, setClose] = useState(true)
    const [watchedMovies, setWatchedMovies] = useState([])
    const [userRating, setUserRating] = useState()
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
        imdbID
    } = movie;

    useEffect(() => {
        const clickedMovie = async () => {
            const res = await fetch(`http://www.omdbapi.com/?apikey=e551638&i=${selectedMovie}`)
            const data = await res.json()
            setMovie(data)

        }
        clickedMovie()
        setClose(false)
    }, [selectedMovie])

    useEffect(() => {
        setClose(true)
    }, [])

    const handleClose = () => {
        setClose(cls => !cls)
        onClose('')
    }

    const addUserRating = (rate) => {
        setUserRating(rate)
    }

    const addMovietoWatched = (id) => {
        if (!watchedMovies?.some(movie => movie.imdbID === id)) {
            moviesFound?.map(move => move.imdbID === id ?
                setWatchedMovies(mov => [...mov, move]) : '')
        }


        // moviesFound?.map(move => move.imdbID === id ?
        //     setWatchedMovies(mov => [...mov, move]) : '')


    }

    return (
        <div className='box' >
            {close || selectedMovie === '' ? <WatchedMovies movieResults={watchedMovies} userRate={userRating} /> :
                (<div className="details">
                    <header>
                        <button className="btn-back" onClick={handleClose}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">

                            <>
                                <StarRating
                                    maxRating={10}
                                    size={24}
                                    onSetRating={addUserRating}
                                />
                                <button className="btn-add" onClick={() => addMovietoWatched(imdbID)}>
                                    + Add to list
                                </button>

                            </>

                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>

                </div>)}

        </div>
    )
}

export default SelectedMovie

