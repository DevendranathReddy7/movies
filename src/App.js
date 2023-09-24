import { useEffect, useState } from "react"

import Navbar from "./components/Navbar";
import MovieResults from "./components/MovieResults";
import SelectedMovie from "./components/SelectedMovie";
//`http://www.omdbapi.com/?i=tt38961&apikey=e551638&s=${query}`

const App = () => {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovieId, setSelectedMovieId] = useState('')
  const [newMovies, setNewMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const movieResults = async () => {
      if (query.length > 0) {
        setIsLoading(true)

      } if (query.length === 0) {
        setError(false)
      }
      setError(false)
      const res = await fetch(`http://www.omdbapi.com/?apikey=e551638&s=${query}`)
      const data = await res.json()
      if (data.Response === "False" && data.Error !== 'Incorrect IMDb ID.') setError(true);
      setIsLoading(false)

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
        <MovieResults moviesFound={searchResults} movieId={handleSelectedMovie} loading={isLoading} err={error} />
        <SelectedMovie selectedMovie={selectedMovieId} moviesFound={newMovies} onClose={handleSelectedMovie} />
      </div>
    </>
  )
}

export default App