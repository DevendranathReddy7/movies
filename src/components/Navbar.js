
const Navbar = ({ query, setQuery, noOfMovies }) => {

    return (
        <>
            <div className="nav-bar">
                <h1>I❤️Movies</h1>

                <input className='search' type="text" value={query} placeholder="seach a movie..." onChange={(e) => setQuery(e.target.value)}></input>

                <p className="num-results">found <strong>{noOfMovies}</strong> movies</p>
            </div>
        </>
    )
}
export default Navbar