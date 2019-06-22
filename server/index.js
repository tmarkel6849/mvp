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

app.listen(PORT, (err) => {
  err ? console.log('error starting up server') : console.log(`listening on ${PORT}....`)
})