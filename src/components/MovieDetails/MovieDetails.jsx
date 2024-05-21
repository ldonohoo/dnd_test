import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


function MovieDetails() {

  const movieDetails = useSelector(store => store.movieDetails)

  const dispatch = useDispatch()
  const history = useHistory()

  // Clear out the movieDetails reducer and navigate the
  // user back to the MovieList view:
  const backToList = () => {
    dispatch({
      type: 'CLEAR_MOVIE_DETAILS'
    })
    history.push('/')
  }

  return (
    <div data-testid='movieDetails'>
      <h2>Movie Details</h2>
      <h3>{movieDetails.title}</h3>
      <img
        src={movieDetails.poster}
        alt={movieDetails.title}/>
      
      <h3>Description:</h3>
      <p>{movieDetails.description}</p>

      <h3>Genres:</h3>
      <ul>
        {
          movieDetails.genres && movieDetails.genres.map((genre) => {
            return (
              <li key={genre.id}>{genre.name}</li>
            )
          })
        }
      </ul>

      <button
        onClick={backToList}
        data-testid="toList">
          Back to Movie List
      </button>
    </div>
  )
}


export default MovieDetails
