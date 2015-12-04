
//https://github.com/rackt/redux-router/blob/master/examples/basic/index.js
import React, { Component, PropTypes } from 'react'

export default class Dashboard extends Component {

  static propTypes = {
    children: PropTypes.node
  }

  constructor() {
    super()
  }

  render() {
        return  (<section className="Dashboard">
                <header>
                  <h1>subsidium Dashboard</h1>
                </header>
                <main>{this.props.children}</main>
        </section>
      )
  }
}
