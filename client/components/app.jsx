import React from 'react'
import Exercises from './Exercises'
import Routine from './Routine'
import Session from './Session'
import User from './User'
import { get } from 'http';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'login'
    }
    this.PORT = 3000
  }

  componentDidMount() {
    const user = 'trevor'
    fetch(`http://${window.location.hostname}:${this.PORT}/user/${user}`,)
      .then(response => response.json())
      .then(data => {
        console.log('data from the fetch: ', data)
      })
  }

  render() {
    return (
      <div className="login">
        I'm here from react!
      </div>
    )
  }
}