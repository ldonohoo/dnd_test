const express = require('express')
const app = express()
const moviesRouter = require('./routes/movies.router.js')
const PORT = process.env.PORT || 5001


/** ---------- MIDDLEWARE ---------- **/
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('build'))


/** ---------- ROUTES ---------- **/
app.use('/api/movies', moviesRouter)


/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
