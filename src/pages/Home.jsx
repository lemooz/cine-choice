import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

import './MovieGrid.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {

    const [topMovies, setTopMovies] = useState([]);

    const getTopRatedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setTopMovies(data.results);
        console.log(data)
    }

    useEffect(() => {
        const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;

        getTopRatedMovies(topRatedUrl);
    }, []);

    return(
    <div className="container">
        <h3 className="title">Best Movies:</h3>
        <div className="movies-container">
            {topMovies.length < 1 && <h2>Loading...</h2>}
            {topMovies.length > 0 &&
                topMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
        </div>
    </div>)
}

export default Home