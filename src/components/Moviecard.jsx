import React from 'react'
import { useMovieContext } from '../contexts/MovieContext'
import '../App.css'
const Moviecard = ({movie}) => {
    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
    const fav = isFavorite(movie.id); // Check if the movie is already a favorite make it active heart


    const onfavclick = (e) => {
        e.preventDefault(); // Prevent the default button behavior that is refreshing the page
        if (fav) {
            removeFromFavorites(movie.id);
        }else{
            addToFavorites(movie);
        }
    }
    
  return (
    <div className='movie-card'>
        <div className='movie-poster'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className='movie-overlay'>
                <button className={`favorite-btn ${fav ? 'active' : ''}`} onClick={onfavclick}> 
                    ♥
                </button>
            </div>
        </div>
        <div className='movie-info'>
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
  )
}

export default Moviecard
