if (process.env.BROWSER) {
  require('../styles/App.scss')
}

import React, { Component, PropTypes } from 'react'
import { ui } from '../constants/'
import Header from '../components/Header'

export default class  App extends Component {

  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <main className="App">
        <Header navItems={ ui.NAV_ITEMS } />
        <section>{this.props.children}</section>
      </main>
    )
  }
}
