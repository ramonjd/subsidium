if (process.env.BROWSER) {
  require('../styles/App.scss')
}

import React, { Component } from 'react'
import { ReduxRouter } from 'redux-router'
import routes from '../routes/'

class App extends Component {
  render() {
    return (
      <ReduxRouter>
        { routes }
      </ReduxRouter>
    )
  }
}

export default App
