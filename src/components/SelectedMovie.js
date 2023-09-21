import { useEffect, useState } from 'react'
import StarRating from './StarRating'
import WatchedMovies from './WatchedMovies'
const SelectedMovie = ({ selectedMovie, moviesFound }) => {
    const [movie, setMovie] = useState({})
    const [close, setClose] = useState(true)
    const [watchedMovies, setWatchedMovies] = useState([{
        Actors
            :
            "Aamir Khan, Katrina Kaif, Abhishek Bachchan",
        Awards
            :
            "21 wins & 23 nominations",
        BoxOffice
            :
            "$8,031,955",
        Country
            :
            "India, United States",
        DVD
            :
            "18 Nov 2016",
        Director
            :
            "Vijay Krishna Acharya",
        Genre
            :
            "Action, Crime, Drama",
        Language
            :
            "Hindi, English",
        Metascore
            :
            "61",
        Plot
            :
            "Jai and Ali return to catch the clown thief, Sahir, who has the City of Chicago captive. Watch an unconventional battle of revenge that will thrill you.",
        Poster
            :
            "https://m.media-amazon.com/images/M/MV5BM2E0NWJlNzYtZjFlZS00NDU4LWI0OTAtYTZlYjc2MmQ2MjdmXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
        Production
            :
            "N/A",
        Rated
            :
            "Not Rated",
        Released
            :
            "20 Dec 2013",
        Response
            :
            "True",
        Runtime
            :
            "172 min",
        Title
            :
            "Dhoom 13",
        Type
            :
            "movie",
        Website
            :
            "N/A",
        Writer
            :
            "Vijay Krishna Acharya, Aditya Chopra",
        Year
            :
            "2013",
        imdbID
            :
            "tt1833673",
        imdbRating
            :
            "5.4",
        imdbVotes
            :
            "47,995"
    }])

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
    }

    useEffect(() => {

    }, [watchedMovies])

    const addMovietoWatched = (id) => {

        {
            moviesFound?.map(move => move.imdbID === id ?
                setWatchedMovies(mov => [...mov, move]) : '')
        }
        // console.log(watchedMovies)
        // {
        //     moviesFound?.map(move => move.imdbID === id ?

        //         watchedMovies.map(movie => movie.imdbID === id ? (console.log('in movies')) :
        //             setWatchedMovies(mov => [...mov, move])) : '')
        // }

    }

    return (
        <div className='box' >
            {close ? <WatchedMovies movieResults={watchedMovies} /> :
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
