const API_KEY=import.meta.env.VITE_API_KEY
const BASE_URL='https://api.themoviedb.org/3'


//with these apis 1. we can search for the movies 2. display the movies
//so when we send request we send it to this url / operation

//aysnch-it will take a sec before we get the response
// await-it will wait for the response to come back
//fetch-it will fetch the data from the api
//response-what we get back from the api
//json()-Turns the raw response into usable JSON.
//data-data.results is usually an array of movies, actual data that we get back from the api

export const getPopularMovies=async()=>{
    const response=await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data=await response.json();
    return data.results;
    // array of popular movie objects (each with properties like title, overview, poster, etc.).
//The function returns this array.
}
export const searchMovies=async(query)=>{
    const response=await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data=await response.json();
    return data.results;
}