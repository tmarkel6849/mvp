import React from 'react'
import Exercises from './Exercises'
import Routine from './Routine'
import Session from './Session'
import User from './User'

export default class App extends React.Component {
  constructor(props) {
    super(pros)
    this.state = {
      page: 'login'
    }
  }

  test = () => {
    console.log('did I make it?')
  }

  render() {
    return (
      <div className="login">
        <input>Please enter your username: </input>
      </div>
    )
  }
}