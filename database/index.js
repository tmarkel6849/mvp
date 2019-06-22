require('dot-env').config()
const { Pool } = require('pg'),
      { Client } = require('pg')

/********************* CONNECTIONS **********************/

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

const client = process.env.NODE_ENV === 'production' ?
  new Client({
    connectionString: process.env.PSQL_CONNECTION_STRING
  }) :
  new Client({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
  })

/********************* GLOBAL VARIABLES  **********************/

const inserting = 'inserting',
      retrieving = 'retrieving'

/********************* HELPER FUNCTIONS ***********************/

const errorHandler = (err, action) => {
  if ( err ) {
    console.error(`error with ${process}: `, err)
    return true
  }
  return false
}

/********************* QUERIES: INSERT DATA **********************/

const addUser = (data, cb) => {
  const queryString = 'INSERT INTO users (name, joindate) VALUES ($1, CURRENT_DATE);'
  client.query(queryString, data, (err, result) => {
    if ( errorHandler(err, inserting) ) return cb(false)
    return cb(true)
  })
}

const addSession = (data, cb) => {
  const queryString = 'INSERT INTO session (type, date) VALUES ($1, CURRENT_DATE);'
  client.query(queryString, data, (err) => {
    if ( errorHandler(err, inserting) ) return cb(false)
    return cb(true)
  })
}

const addRoutine = (data, cb) => {
  const queryString = 'INSERT INTO session (type, date) VALUES ($1, CURRENT_DATE);'
  client.query(queryString, data, (err) => {
    if ( errorHandler(err, inserting) ) return cb(false)
    return cb(true)
  })
}

/***********************QUERIES: RETRIEVING DATA ************************/

const getUser = (data, cb) => {
  const queryString = 'SELECT name, joindate FROM users WHERE name=$1;'
  client.query(queryString, data, (err, result) => {
    if ( errorHandler(err, retrieving) ) return cb(false)
    return cb(result)
  })
}

const getSession = (data, cb) => {
  const queryString = 'SELECT sessions.type, sessions.date FROM sessions WHERE sessions.userid=$1 AND sessions.date=$1;'
  client.query(queryString, data, (err, result) => {
    if ( errorHandler(err, retrieving) ) return cb(false)
    return cb(true)
  })
}

const getLastSession = (data, cb) => {
  const queryString = 'SELECT sessions.type, sessions.date FROM sessions WHERE sessions.userid=$1 ORDER BY sessiond.id DESC LIMIT 1;'
  client.query(queryString, data, (err, result) => {
    if ( errorHandler(err, retrieving) ) return cb(false)
    return cb(result)
  })
}

const getAllSessions = (data, cb) => {
  const queryString = 'SELECT sessions.type, sessions.date FROM sessions WHERE sessions.userid=$1;'
  client.query(queryString, data, (err, result) => {
    if ( errorHandler(err, retrieving) ) return cb(false)
    return cb(result)
  })
}

const getRoutine = (data, cb) => {
  const queryString = 'SELECT type FROM routines WHERE id=$1'
  client.query(queryString, data, (err, result) => {
    if ( errorHandler(err, retrieving) ) return cb(false)
    return cb(result)
  })
}

// const getStats = (data, cb) => {
  // collect data metrics for types of exercises, improvements, so on
// }



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