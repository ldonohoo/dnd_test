const express = require('express')
const router = express.Router()
const pool = require('../modules/pool')


// Sends back an array of all of the movies:
  // Shaped like:
  // [
  //   {
  //     id: 14,
  //     title: 'Toy Story',
  //     poster: 'images/toy-story.jpg',
  //   },
  //   {...},
  //   {...},
  //   {...}
  // ]
router.get('/', (req, res) => {
  const sqlText = `
    SELECT
      id,
      title,
      poster
    FROM movies
      ORDER BY title ASC;
  `;
  pool.query(sqlText)
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((dbErr) => {
      console.log('GET /api/movies error:', dbErr)
      res.sendStatus(500)
    })
})


// Sends back a single movie object that includes
// description and associated genres:
  // Shaped like:
    // {
    //   id: 14,
    //   title: 'Toy Story',
    //   poster: 'images/toy-story.jpg',
    //   description: 'Toy Story is a 1995 American...',
    //   genres: [
    //     {id: 1, name: 'Adventure'},
    //     {id: 2, name: 'Animated'},
    //     {id: 4, name: 'Comedy'}
    //   ]
    // }
router.get('/:id', (req, res) => {
  const movieId = req.params.id

  const sqlText = `
    SELECT
      movies.id AS movie_id,
      movies.title,
      movies.poster,
      movies.description,
      genres.id AS genre_id,
      genres.name AS genre_name
    FROM movies
      JOIN movies_genres
        ON movies.id = movies_genres.movie_id
      JOIN genres
        ON movies_genres.genre_id = genres.id
      WHERE movies.id = $1;
  `
  const sqlValues = [movieId]

  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      // The array of objects our query returned:
      const joinedData = dbRes.rows
        //  👆 example of how joinedData looks in `transforming_data.md`

      // Building up the object that'll contain the data
      // we want to send back to the client:
      const detailsObject = {
        id: joinedData[0].movie_id,
        title: joinedData[0].title,
        poster: joinedData[0].poster,
        description: joinedData[0].description
      }
        //  👆 example of how detailsObject looks in `transforming_data.md`


      // Now we need to build the genres array that we want to
      // include in the detailsObject that we're going to send
      // to the client:
      const genres = joinedData.map((row) => {
        return {
          id: row.genre_id,
          name: row.genre_name
        }
      })
        //  👆 example of how genres looks in `transforming_data.md`

      // Add the genres array into the detailsObject object:
      detailsObject.genres = genres
        //  👆 example of how detailsObject looks in `transforming_data.md`

      // Now that we've shaped our data into the object we wanted,
      // we send it to the client:
      res.send(detailsObject)
    })
    .catch((dbErr) => {
      console.log('GET /api/movies/:id error:', dbErr)
      res.sendStatus(500)
    })
})

module.exports = router
