require('dotenv').config()

const express = require('express'),
      bodyParser = require('body-parser')
      path = require('path')
      db = require('../database/index.js')

const app = express(),
      PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname + '../public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/************************* POST ROUTES ***********************/

app.post('/newuser', (req, res) => {
  const entry = req.body.data
  db.addUser(entry, (result) => {
    result ? res.sendStatus(201) : res.sendStatus(400)
  })
})

app.post('/newsession', (req, res) => {
  const entry = req.body.data
  db.addSession(entry, (result) => {
    result ? res.sendStatus(201) : res.sendStatus(400)
  })
})

app.post('/newroutine', (req, res) => {
  const entry = req.body.data
  db.addRoutine(entry, (result) => {
    result ? res.sendStatus(201) : res.sendStatus(400)
  })
})

/************************* GET ROUTES ***********************/

app.get('/user', (req, res) => {
  const reqParams = req.body.data
  db.getUser(reqParams, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/userall', (req, res) => {
  const reqParams = req.body.data
  db.getAllUser(reqParams, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/session', (req, res) => {
  const reqParams = req.body.data
  db.getSession(reqParams, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/lastsession', (req, res) => {
  const reqParams = req.body.data
  db.getLastSession(reqParams, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/allsessions', (req, res) => {
  const reqParams = req.body.data
  db.getAllSessions(reqParams, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/routine', (req, res) => {
  const reqParams = req.body.data
  db.getRoutine(reqParams, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/stats', (req, res) => {
  const reqParams = req.body.data
  db.getStats(reqParams, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

/******************** HEY! LISTEN!! *******************/

app.listen(PORT, (err) => {
  err ? console.log('error starting up server') : console.log(`listening on ${PORT}....`)
})


/********************** NOTES *********************
 * data needs to be coming in as an array for the db
 *
 *
 *
 *
 *
 *
*/