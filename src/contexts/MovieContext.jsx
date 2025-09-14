import { createContext,useState,useContext,useEffect } from "react";

//create context
const MovieContext=createContext(); // Create a context for movie-related data and functions because we want to share movie data and functions across multiple components without prop drilling.

//consume context(use this in other components to access the context values)
export const useMovieContext=()=>useContext(MovieContext);


//we will wrap our whole app with this provider component as every component in our app will need access to movie data and functions
//provider component: provides state to any of the component wrapped around it
// wraps around parts of the app that need access to the context
export const MovieProvider=({children})=>{
    const [favorites,setFavorites]=useState([]); //array of favorite movies

    //when the component mounts we check if we have any favorites in local storage
    useEffect(()=>{
        const storedfavs=localStorage.getItem("favorites");

        if(storedfavs) setFavorites(JSON.parse(storedfavs)); //if we have favs in local storage then set it to favorites state
    },[])

    //whenever favorites state changes we update local storage
    useEffect(()=>{
        localStorage.setItem("favorites",JSON.stringify(favorites)); //whenever favorites state changes we update local storage
    },[favorites])
    

    //three functions to add, remove and check if a movie is favorite
    const addToFavorites=(movie)=>{
        setFavorites(prev=>[...prev,movie]);
    }

    const removeFromFavorites=(movieId)=>{
        setFavorites(prev=>prev.filter(movie=>movie.id !== movieId)); //filter out the movies expcet with the given id
    }

    const isFavorite=(movieId)=>{
        return favorites.some(movie=>movie.id === movieId); //returns true if the movie is in favorites array
    }


    //global object that holds the state and functions we want to share
    const value={
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}

//children props are reserved props used to pass components that will be wrapped by this provider
//children will be everything inside the provider tag in app.js
//like <MovieProvider> <App/> </MovieProvider>
//here App is children
