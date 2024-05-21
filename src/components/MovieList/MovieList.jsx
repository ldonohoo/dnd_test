import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieItem from './MovieItem.jsx'


function MovieList() {

  const movies = useSelector(store => store.movies)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'FETCH_MOVIES'
    })
  }, [])

  return (
    <main>
      <h2>Movie List</h2>
      <section className="movies">
        {
          movies.map(movie => {
            return (
             <MovieItem key={movie.id} movie={movie} />
            )
          })
        }
      </section>
    </main>
  )
}


export default MovieList
