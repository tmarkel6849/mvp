require('dotenv').config()

const express = require('express'),
      bodyParser = require('body-parser')
      path = require('path')
      db = require('../database/index.js')

const app = express(),
      PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname + '/../public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/************************* POST ROUTES **************************/

app.post('/newuser', (req, res) => {
  const entry = [ req.params.user ]
  db.addUser(entry, (result) => {
    result ? res.sendStatus(201) : res.sendStatus(400)
  })
})

app.post('/newsession', (req, res) => {
  const entry = [ req.params.user ]
  db.addSession(entry, (result) => {
    result ? res.sendStatus(201) : res.sendStatus(400)
  })
})

app.post('/newroutine', (req, res) => {
  const entry = [ req.params.user ]
  db.addRoutine(entry, (result) => {
    result ? res.sendStatus(201) : res.sendStatus(400)
  })
})

/************************* GET ROUTES *************************/

app.get('/user/:user', (req, res) => {
  const params = [ req.params.user ]
  db.getUser(params, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/userall/:user', (req, res) => {
  const params = [ req.params.user ]
  db.getAllUser(params, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/session/:session', (req, res) => {
  const params = [ req.params.session ]
  db.getSession(params, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/lastsession/:session', (req, res) => {
  const params = [ req.params.session ]
  db.getLastSession(params, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/allsessions/:user', (req, res) => {
  const params = [ req.params.user ]
  db.getAllSessions(params, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/routine/:routine', (req, res) => {
  const params = [ req.params.routine ]
  db.getRoutine(params, (result) => {
    result ? res.send(result).status(200) : res.send(null).status(400)
  })
})

app.get('/stats/:stats', (req, res) => {
  const params = [ req.params.user ]
  db.getStats(params, (result) => {
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