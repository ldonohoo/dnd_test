const pg = require('pg')
let pool


if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  let databaseName = 'saga_movies_weekend'
  
  if (process.env.NODE_ENV === 'test') {
    databaseName = 'prime_testing'
  }

  pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: databaseName, 
  })
}


module.exports = pool
