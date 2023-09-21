import { useEffect, useState } from "react"

import Navbar from "./components/Navbar";
import MovieResults from "./components/MovieResults";
import WatchedMovies from "./components/WatchedMovies";
import SelectedMovie from "./components/SelectedMovie";
//`http://www.omdbapi.com/?i=tt38961&apikey=e551638&s=${query}`

const App = () => {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovieId, setSelectedMovieId] = useState('')
  const [newMovies, setNewMovies] = useState([])
  useEffect(() => {
    const movieResults = async () => {
      const res = await fetch(`http://www.omdbapi.com/?apikey=e551638&s=${query}`)
      const data = await res.json()
      setSearchResults(data.Search)
    }
    movieResults()

  }, [query])

  useEffect(() => {

    const movieResults = async (id) => {
      const res = await fetch(`http://www.omdbapi.com/?apikey=e551638&i=${id}`)
      const data = await res.json()
      setNewMovies(movie => [...movie, data])
    }
    searchResults?.map(movie => movieResults(movie.imdbID))
  }, [searchResults])

  const handleSelectedMovie = (id) => {
    setSelectedMovieId(id)
  }

  return (
    <>
      <Navbar query={query} setQuery={setQuery} noOfMovies={newMovies?.length} />
      <div className="main">
        <MovieResults moviesFound={searchResults} movieId={handleSelectedMovie} />
        <SelectedMovie selectedMovie={selectedMovieId} moviesFound={newMovies} />
      </div>
    </>
  )
}

export default App