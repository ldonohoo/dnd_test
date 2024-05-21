import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'


function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies)
  yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails)
}

// Gets all the movies and puts them into the movies reducer:
function* fetchAllMovies() {
  try {
    // Fetch the movies data from the server:
    const moviesResponse = yield axios({
      method: 'GET',
      url: '/api/movies'
    })
    
    // Update the movies reducer to hold the array
    // of movie objects we got from the server:
    const moviesData = moviesResponse.data
    yield put({
      type: 'SET_MOVIES',
      payload: moviesData
    })
  } catch (error) {
    console.log('fetchAllMovies error:', error)
  }
}

// Gets the detailed data for one movie and puts it into the
// movieDetails reducer:
function* fetchMovieDetails(action) {
  try {
    // Fetch the details about a single movie:
    const idOfMovieToFetch = action.payload
    const detailsResponse = yield axios({
      method: 'GET',
      url: `/api/movies/${idOfMovieToFetch}`
    })

    // Update the movieDetails reducer to hole the object
    // of movie details data we got from the server:
    const detailsData = detailsResponse.data
    yield put({
      type: 'SET_MOVIE_DETAILS',
      payload: detailsData
    })
    
  } catch (error) {
    console.log('fetchMovieDetails error:', error)
  }
}


// Reducer to hold the array of all the movie
// movies objects. fetchAllMovies obtains the
// data and puts it here:
  // Shaped like:
  // [ {id, title, poster}, {...}, {...}, {...}]
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload
    default:
      return state
  }
}

// Reducer to hold the details data for a single
// movie:
  // Shaped like:
  // { id, title, poster, description, genres: []}
const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MOVIE_DETAILS':
      return action.payload
    case 'CLEAR_MOVIE_DETAILS':
      return {}
    default:
      return state
  }
}


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({
    movies,
    movieDetails
  }),
  applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga)


export default store
