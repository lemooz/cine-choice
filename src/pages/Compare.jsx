import { useState, useEffect } from "react";
import './Compare.css';
import MovieCard from "../components/MovieCard";

const Compare = () => {
    const searchUrl = import.meta.env.VITE_SEARCH;
    const movieUrl = import.meta.env.VITE_API;
    const apiKey = import.meta.env.VITE_API_KEY;

    const [selectedMovies, setSelectedMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const url = `${searchUrl}?${apiKey}&query=${query}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setSearchResults(data.results);
        } catch (err) {
            console.error(err);
        }
    };
    
    const addMovie = (movie) => {
        if(selectedMovies.length < 4 && !selectedMovies.some(m => m.id === movie.id)){
            setSelectedMovies([...selectedMovies, movie]);
            setSearchResults([]);
            setQuery("");
        }
    }

    const removeMovie = (id) => {
        setSelectedMovies(selectedMovies.filter(movie => movie.id !== id));
    }

    useEffect(() => {
        if(selectedMovies.length > 0){
            const fetchSimilarMovies = async () => {
                const similarMovies = await Promise.all(selectedMovies.map(async movie => {
                    const url = `${movieUrl}${movie.id}/similar?${apiKey}`;
                    const res = await fetch(url);
                    const data = await res.json();
                    return data.results;
                })
            );
            const combinedMovies = similarMovies.flat();

            const selectedGenres = new Set(selectedMovies.flatMap(movie => movie.genre_ids));
            const selectedYears = new Set(selectedMovies.map(movie => movie.release_date.split("-")[0]));

            const moviesCount = combinedMovies.reduce((acc, movie) => {
                const isSimilar = movie.genre_ids.some(genre => selectedGenres.has(genre)) || selectedYears.has(movie.release_date.split("-")[0]);
                if(isSimilar){
                    acc[movie.id] = acc[movie.id] ? { ...movie, count: acc[movie.id].count + 1 } : { ...movie, count: 1 };
                    return acc;
                }
            }, {});
            const sortedMovies = Object.values(moviesCount).sort((a, b) => b.vote_average - a.vote_average).slice(0, 6);
            setRecommendedMovies(sortedMovies);
            };
            fetchSimilarMovies();
    } else{
        setRecommendedMovies([]);
        }
    },[selectedMovies]);

    return (
        <div className="compare-page">
            <h1>Choice Movies</h1>
            <form onSubmit={handleSearch}>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Choose a movie..." />
                <button type="submit">Search</button>
            </form>
            <div className="search-results">
                {searchResults.map (movie => (
                    <div key={movie.id} onClick={() => addMovie(movie)}>
                        {movie.title}
                    </div>
                ))}
            </div>
            <div className="selected-movies">
                {selectedMovies.map(movie =>(
                    <div key={movie.id}>
                        <div className="title">
                            {movie.title}
                        </div>
                        <button onClick={() => removeMovie(movie.id)}>Remove</button>
                    </div>
                ))}
            </div>
            <br />
            <h2>Recommended Movies</h2>
            <br />
            <div className="recommended-movies">
                {recommendedMovies.map(movie => (
                    <div className="movie-card-container" key={movie.id}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Compare