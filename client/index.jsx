import React from 'react'
import reactDOM from 'react-dom'
import App from './components/app'

module.exports = () => (
  <App />
)

reactDOM.render(<Index />, document.getElementById('root'))