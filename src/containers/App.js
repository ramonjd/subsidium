if (process.env.BROWSER) {
  require('../styles/App.scss')
}

import React, { Component, PropTypes, cloneElement } from 'react'
import { ui } from '../constants/'
import Header from '../components/Header'
import Immutable from 'seamless-immutable'

export default class  App extends Component {

  static propTypes = {
    children: PropTypes.node
  }
  static contextTypes = {
      data: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
    console.log('App props', this.props)
  }

  render() {
    const currentRoute = this.props.routes[this.props.routes.length - 1]
    return (
      <main className="App">
        <Header navItems={ ui.NAV_ITEMS } currentRoute={currentRoute}/>
        <section>{this.props.children && cloneElement(this.props.children, Immutable(this.context.data))}</section>
      </main>
    )
  }
}
