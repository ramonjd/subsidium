if (process.env.BROWSER) {
  require('../styles/App.scss')
}

import React, { Component, PropTypes, cloneElement } from 'react'
import { ui } from '../constants/'
import Header from '../components/Header'

export default class  App extends Component {

  static propTypes = {
    children: PropTypes.node
  }
  static contextTypes = {
      data: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
    console.log('App context', this.context)
  }

  render() {
    const currentRoute = this.props.routes[this.props.routes.length - 1]
    const props = Object.assign({}, this.props, this.context.data)
    return (
      <main className="App">
        <Header navItems={ ui.NAV_ITEMS } currentRoute={currentRoute}/>
        <section>{this.props.children && cloneElement(this.props.children, props)}</section>
      </main>
    )
  }
}
