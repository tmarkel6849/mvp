import React from 'react'
import Exercises from './Exercises'
import Routine from './Routine'
import Session from './Session'
import User from './User'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'login'
    }
    this.PORT = 3000
    this.fetchURL = `http://${window.location.hostname}:${this.PORT}`
  }

  componentDidMount() {
    // prompt for username
    this.getData('user', 'trevor')
  }

  getData = (location, request) => {
    fetch(`${this.fetchURL}/${location}/${request}`)
      .then(response => response.json())
      .then(data => {
        console.log('user data from fetch: ', data)
      })
  }

  postData = (location, entry) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(`${this.fetchURL}/${location}`, options)
      .then(response => response.json())
      .then(data => {
        console.log('entry was stored....')
      })
  }

  render() {
    return (
      <div className="login">
        Get user data:
      </div>
    )
  }
}