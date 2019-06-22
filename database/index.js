require('dotenv').config()
const { Pool } = require('pg')

/********************* DB CONNECTION **********************/

const pool = process.env.NODE_ENV === 'production'
? new Pool({
  connectionString: process.env.PSQL_CONNECTION_STRING
})
: new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DB,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
})

/********************* GLOBAL VARIABLES  **********************/

const inserting = 'inserting',
      retrieving = 'retrieving'

/********************* ERROR / EDGE CASE FUNCTIONS ***********************/

const errorHandler = (err, action) => {
  if ( err ) {
    console.error(`error with ${process}: `, err)
    return true
  }
  return false
}

const dataHandler = (data) => {
  if ( !data ) {
    console.log('provide appropriate data....')
    return true
  }
  return false
}

const cbHandler = (cb) => {
  if ( typeof cb !== 'function' ) {
    console.log('provide appropirate callback....')
    return true
  }
  return false
}

/********************* QUERIES: INSERT DATA **********************/

const addUser = (data, cb) => {
  if ( dataHandler(data) ) return
  if ( cbHandler(cb) ) return
  const queryString = 'INSERT INTO users (name, weight, boudleringgrade, sportgrade, tradgrade, joindate) VALUES ($1,$2,$3,$4,$5,CURRENT_DATE);'
  pool.query(queryString, data, (err) => {
     errorHandler(err, inserting) ? cb(false) : cb(true)
  })
}

const addSession = (data, cb) => {
  if ( dataHandler(data) ) return
  if ( cbHandler(cb) ) return
  const queryString = 'INSERT INTO sessions (type, userid, date) VALUES ($1,$2, CURRENT_DATE);'
  pool.query(queryString, data, (err) => {
    errorHandler(err, inserting) ? cb(false) : cb(true)
  })
}

const addRoutine = (data, cb) => {
  if ( dataHandler(data) ) return
  if ( cbHandler(cb) ) return
  const queryString = 'INSERT INTO routines (type, createdby, createddate) VALUES ($1,$2, CURRENT_DATE);'
  pool.query(queryString, data, (err) => {
    errorHandler(err, inserting) ? cb(false) : cb(true)
  })
}

/***********************QUERIES: RETRIEVING DATA ************************/

const getUser = (data, cb) => {
  if ( dataHandler(data) ) return
  if ( cbHandler(cb) ) return
  const queryString = 'SELECT name, joindate FROM users WHERE name=$1;'
  pool.query(queryString, data, (err, result) => {
    errorHandler(err, retrieving) ? cb(false) : cb(result)
  })
}

const getSession = (data, cb) => {
  if ( dataHandler(data) ) return
  if ( cbHandler(cb) ) return
  const queryString = 'SELECT sessions.type, sessions.date FROM sessions WHERE sessions.userid=$1 AND sessions.date=$1;'
  pool.query(queryString, data, (err, result) => {
    errorHandler(err, retrieving) ? cb(false) : cb(true)
  })
}

const getLastSession = (data, cb) => {
  if ( dataHandler(data) ) return
  if ( cbHandler(cb) ) return
  const queryString = 'SELECT sessions.type, sessions.date FROM sessions WHERE sessions.userid=$1 ORDER BY sessiond.id DESC LIMIT 1;'
  pool.query(queryString, data, (err, result) => {
    errorHandler(err, retrieving) ? cb(false) : cb(result)
  })
}

const getAllSessions = (data, cb) => {
  if ( dataHandler(data) ) return
  if ( cbHandler(cb) ) return
  const queryString = 'SELECT sessions.type, sessions.date FROM sessions WHERE sessions.userid=$1;'
  pool.query(queryString, data, (err, result) => {
    errorHandler(err, retrieving) ? cb(false) : cb(result)
  })
}

const getRoutine = (data, cb) => {
  if ( dataHandler(data) ) return
  if ( cbHandler(cb) ) return
  const queryString = 'SELECT type FROM routines WHERE id=$1'
  pool.query(queryString, data, (err, result) => {
    errorHandler(err, retrieving) ? cb(false) : cb(result)
  })
}

const getStats = (data, cb) => {
  if ( dataHandler(data) ) return
  if ( cbHandler(cb) ) return
  // collect data metrics for types of exercises, improvements, so on
}

/*********************** TEST ENTRIES *************************/

// addUser(['trevor', 150, 13, 14, null], (result) => {
//   result ? console.log('user saved') : console.log('user NOT saved')
// })

// addSession(['max hangs', 1], (result) => {
//   result ? console.log('session saved') : console.log('session NOT saved')
// })

// addRoutine(['max hangs with weight', 0], (result) => {
//   result ? console.log('routine saved') : console.log('routine NOT saved')
// })


module.exports ={
  addUser,
  addSession,
  addRoutine,
  getUser,
  getSession,
  getLastSession,
  getAllSessions,
  getRoutine,
  getStats
}