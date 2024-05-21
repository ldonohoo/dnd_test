import { Route, HashRouter as Router } from 'react-router-dom'
import MovieList from '../MovieList/MovieList.jsx'
import MovieDetails from '../MovieDetails/MovieDetails.jsx'


function App() {

  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route exact path="/">
          <MovieList />
        </Route>
        <Route exact path="/movie_details">
          <MovieDetails />
        </Route>
      </Router>
    </div>
  )
}


export default App
