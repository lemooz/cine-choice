import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill 
} from 'react-icons/bs';

import MovieCard from '../components/MovieCard';

import './Movie.css'

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  }

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }
  
  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}`;
    getMovie(movieUrl);
0, []});

  return (
    <div className='movie-page'>
      {movie && (<>
      <MovieCard movie={movie} showLink={false}/>
      <p className="tagline">{movie.tagline}</p>
      <div className="info">
        <h3>
          <BsWallet2 /> Budget:
          <p>{formatCurrency(movie.budget)}</p>
        </h3>
      </div>
      <div className="info">
        <h3>
          <BsGraphUp /> Revenue:
          <p>{formatCurrency(movie.revenue)}</p>
        </h3>
      </div>
      <div className="info">
        <h3>
          <BsHourglassSplit /> Runtime:
          <p>{movie.runtime} minutes</p>
        </h3>
      </div>
      <div className="info description">
        <h3>
          <BsFillFileEarmarkTextFill /> Overview:
        </h3>
        <p>{movie.overview}</p>
      </div>
      </>)}
    </div>
  )
  }
  
  export default Movie