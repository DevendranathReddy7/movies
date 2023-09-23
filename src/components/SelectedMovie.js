import { useEffect, useState } from 'react'
import StarRating from './StarRating'
import WatchedMovies from './WatchedMovies'

const SelectedMovie = ({ selectedMovie, moviesFound, onClose }) => {
    const [movie, setMovie] = useState({})
    const [close, setClose] = useState(true)
    const [watchedMovies, setWatchedMovies] = useState([])
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

    const addMovietoWatched = (id) => {
        if (!watchedMovies?.some(movie => movie.imdbID === id)) {
            moviesFound?.map(move => move.imdbID === id ?
                setWatchedMovies(mov => [...mov, move]) : '')
        }

        // {
        //     moviesFound?.map(move => move.imdbID === id ?
        //         setWatchedMovies(mov => [...mov, move]) : '')
        // }

    }

    return (
        <div className='box' >
            {close || selectedMovie === '' ? <WatchedMovies movieResults={watchedMovies} /> :
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
                            {!false ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                    // onSetRating={setUserRating}
                                    />
                                    {1 > 0 && (
                                        <button className="btn-add" onClick={() => addMovietoWatched(imdbID)}>
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You rated with movie {5} <span>⭐️</span>
                                </p>
                            )}
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

// function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
//     const [movie, setMovie] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const [userRating, setUserRating] = useState("");

//     const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
//     const watchedUserRating = watched.find(
//         (movie) => movie.imdbID === selectedId
//     )?.userRating;

//     const {
//         Title: title,
//         Year: year,
//         Poster: poster,
//         Runtime: runtime,
//         imdbRating,
//         Plot: plot,
//         Released: released,
//         Actors: actors,
//         Director: director,
//         Genre: genre,
//     } = movie;

//     function handleAdd() {
//         const newWatchedMovie = {
//             imdbID: selectedId,
//             title,
//             year,
//             poster,
//             imdbRating: Number(imdbRating),
//             runtime: Number(runtime.split(" ").at(0)),
//             userRating,
//         };

//         onAddWatched(newWatchedMovie);
//         onCloseMovie();
//     }

//     useEffect(
//         function () {
//             function callback(e) {
//                 if (e.code === "Escape") {
//                     onCloseMovie();
//                 }
//             }

//             document.addEventListener("keydown", callback);

//             return function () {
//                 document.removeEventListener("keydown", callback);
//             };
//         },
//         [onCloseMovie]
//     );

//     useEffect(
//         function () {
//             async function getMovieDetails() {
//                 setIsLoading(true);
//                 const res = await fetch(
//                     `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
//                 );
//                 const data = await res.json();
//                 setMovie(data);
//                 setIsLoading(false);
//             }
//             getMovieDetails();
//         },
//         [selectedId]
//     );

//     useEffect(
//         function () {
//             if (!title) return;
//             document.title = `Movie | ${title}`;

//             return function () {
//                 document.title = "usePopcorn";
//                 // console.log(`Clean up effect for movie ${title}`);
//             };
//         },
//         [title]
//     );


// }
