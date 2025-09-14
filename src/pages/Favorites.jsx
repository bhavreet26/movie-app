import React from 'react'
import '../App.css'
import Moviecard from '../components/Moviecard'
import { useMovieContext } from '../contexts/MovieContext'  

const Favorites = () => {

  const { favorites } = useMovieContext();

  if(favorites){
    //return display those movies
    return (
    <div className='favorites'>
      <h2>Your Favorites</h2>
    <div className='movies-grid'>
        {favorites.map((movie)=>(
            <Moviecard key={movie.id} movie={movie} />
        )
        )}
      </div>
      </div>
      );
  }

  return (
    <div className='favorites'>
      <div className='favorites-empty'>
      <h2>NO FAVORITES</h2>
      <p>Start adding your favorite movies!</p>
      </div>
    </div>
  )
}

export default Favorites
