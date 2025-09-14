import React,{useEffect, useState} from 'react'
import Moviecard from '../components/Moviecard'
import '../App.css'
import { getPopularMovies, searchMovies } from '../services/api';

const Home = () => {
    const [searchquery, setSearchquery] = useState("");


    // const movies=[
    //     {id:1, title:"Inception", release_date:"2010"},
    //     {id:2, title:"Interstellar", release_date:"2014"},
    //     {id:3, title:"The Dark Knight", release_date:"2008"},
    // ];

    //const movies=getPopularMovies();
//this will work but this function will called every time the component re renders
//therefore we use useEffect
    
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null); // to handle any errors during the fetch process
    const[loading, setLoading] = useState(true); // to indicate loading state
    useEffect( ()=>{
      const loadPopularMovies= async()=>{
        try{
          const popularMovies=await getPopularMovies();
          setMovies(popularMovies);
        } catch(err){
          console.log(err)
          setError("Failed to load movies. Please try again later.");
        }finally{
          setLoading(false); // Set loading to false after fetch attempt bcause loading is done whether it succeeded or failed
        }
      }
      loadPopularMovies(); //call the async function to load movies
    },[]) 
    //empty dependency array means this effect runs only once after the initial render.
    //if i put searchquery in dependency array it will run every time searchquery changes


    
    const handlsearch = async(e) => {
        e.preventDefault();
        //trim removes all the spaces from start and end of the string
        if(!searchquery.trim() )   return //this will prevent empty search 
        if(loading) return //this will prevent multiple searches while one is in progress

        setLoading(true); // Set loading to true when a search starts
        try{
          const searchResults=await searchMovies(searchquery);
          setMovies(searchResults);
          setError(null); // Clear any previous errors on successful search
        }catch(err){
          console.log(err)
          setError("Failed to search movies. Please try again later.");
        }finally{
          setLoading(false);
        }
    }
  return (
    <div className='home-page'>
        {/* searching for movies */}
      <form onSubmit={handlsearch} className='search-form'>
        <input 
        type="text" 
        className='search-input' 
        placeholder='Search for a movie...' 
        value={searchquery} 
        onChange={(e) => setSearchquery(e.target.value)} 
        />
        <button type="submit" className='search-button'>Search</button>
      </form>
      {/* displaying movies
      whenever i change state it re renders whole component. therefore display again */}
      <div className='movies-grid'>
        {movies.map((movie)=>(
            // movie.title.toLowerCase().includes(searchquery.toLowerCase()) && --> this was conditional rendering but i will use apis to do all this
            <Moviecard key={movie.id} movie={movie} />
        )
        )}
      </div>
    </div>
  )
}

export default Home
