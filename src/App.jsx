import React from 'react'
import Home from './pages/home'
import Favorites from './pages/Favorites'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'

const App = () => {
  return (
    <MovieProvider>
    <NavBar/>
    <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </main>
    </MovieProvider>
  )
}

export default App
