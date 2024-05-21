import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


function MovieItem({movie}) {

  const dispatch = useDispatch()
  const history = useHistory()

  const goToDetails = () => {
    // 1. Fetch the details for this movie and store them
    //    in a movieDetails reducer. (AKA: Yell at the Redux
    //    store to run the fetchMovieDetails Saga function.)
    dispatch({
      type: 'FETCH_MOVIE_DETAILS',
      payload: movie.id
    })
    // 2. Route the user to /#/movie_details
    history.push('/movie_details')
  }

  return (
    <div data-testid='movieItem'>
      <h3>{movie.title}</h3>
      <img
        src={movie.poster}
        alt={movie.title}
        onClick={goToDetails}
        data-testid="toDetails"
        />
    </div>
  )
}


export default MovieItem
