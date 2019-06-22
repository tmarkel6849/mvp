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

/********************* ERROR / EDGE CASE HANDLERS ***********************/

const errorHandler = (err, action) => {
  if ( err ) {
    console.error(`error with ${process}: `, err)
    return true
  }
  return false
}

const paramsHandler = (params) => {
  if ( !params || params.length === 0 ) {
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

const addUser = (params, cb) => {
  if ( paramsHandler(params) || cbHandler(cb) ) return
  const queryString = 'INSERT INTO users (name, weight, boudleringgrade, sportgrade, tradgrade, joindate) VALUES ($1,$2,$3,$4,$5,CURRENT_DATE);'
  pool.query(queryString, params, (err) => {
     errorHandler(err, inserting) ? cb(false) : cb(true)
  })
}

const addSession = (params, cb) => {
  if ( paramsHandler(params) || cbHandler(cb) ) return
  const queryString = 'INSERT INTO sessions (type, userid, date) VALUES ($1,$2, CURRENT_DATE);'
  pool.query(queryString, params, (err) => {
    errorHandler(err, inserting) ? cb(false) : cb(true)
  })
}

const addRoutine = (params, cb) => {
  if ( paramsHandler(params) || cbHandler(cb) ) return
  const queryString = 'INSERT INTO routines (type, createdby, createddate) VALUES ($1,$2, CURRENT_DATE);'
  pool.query(queryString, params, (err) => {
    errorHandler(err, inserting) ? cb(false) : cb(true)
  })
}

/***********************QUERIES: RETRIEVING DATA ************************/

const getUser = (params, cb) => {
  if ( paramsHandler(params) || cbHandler(cb) ) return
  const queryString = 'SELECT name, joindate FROM users WHERE name=$1;'
  pool.query(queryString, params, (err, result) => {
    errorHandler(err, retrieving) ? cb(false) : cb(result.rows)
  })
}

const getAllUser = (params, cb) => {
  if ( paramsHandler(params) || cbHandler(cb) ) return
  const queryString = 'SELECT name, weight, boudleringgrade, sportgrade, tradgrade, joindate FROM users WHERE name=$1;'
  pool.query(queryString, params, (err, result) => {
    errorHandler(err, retrieving) ? cb(false) : cb(result.rows)
  })
}

const getSession = (params, cb) => {
  if ( paramsHandler(params) || cbHandler(cb) ) return
  const queryString = 'SELECT sessions.type, sessions.date FROM sessions WHERE sessions.userid=$1 AND sessions.date=$1;'
  pool.query(queryString, params, (err, result) => {
    errorHandler(err, retrieving) ? cb(false) : cb(result.rows)
  })
}

const getLastSession = (params, cb) => {
  if ( paramsHandler(params) || cbHandler(cb) ) return
  const queryString = 'SELECT sessions.type, sessions.date FROM sessions WHERE sessions.userid=$1 ORDER BY sessiond.id DESC LIMIT 1;'
  pool.query(queryString, params, (err, result) => {
    errorHandler(err, retrieving) ? cb(false) : cb(result.rows)
  })
}

const getAllSessions = (params, cb) => {
  if ( paramsHandler(params) || cbHandler(cb) ) return
  const queryString = 'SELECT sessions.type, sessions.date FROM sessions WHERE sessions.userid=$1;'
  pool.query(queryString, params, (err, result) => {
    errorHandler(err, retrieving) ? cb(false) : cb(result.rows)
  })
}

const getRoutine = (params, cb) => {
  if ( paramsHandler(params) || cbHandler(cb) ) return
  const queryString = 'SELECT type FROM routines WHERE id=$1'
  pool.query(queryString, params, (err, result) => {
    errorHandler(err, retrieving) ? cb(false) : cb(result.rows)
  })
}

const getStats = (params, cb) => {
  if ( paramsHandler(params) || cbHandler(cb) ) return
  // collect data metrics for types of exercises, improvements, so on
}

/*********************** EXPORTS ************************/

module.exports ={
  pool,
  addUser,
  addSession,
  addRoutine,
  getUser,
  getAllUser,
  getSession,
  getLastSession,
  getAllSessions,
  getRoutine,
  getStats
}