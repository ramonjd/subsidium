if (process.env.BROWSER) {
  require('../styles/Header.scss')
}


import React, { Component, PropTypes } from 'react'
import { ui } from '../constants/'

export default class Header extends Component {
    static propTypes = {
      navItems : PropTypes.array,
      currentRoute : PropTypes.object
    }
    render() {
        return (
          <header className="Header">
            <span className="Logo"><a href="/">subsidium</a></span>
            <nav>
              <ul>
                {this.props.navItems.map((item, i) =>
                  <li  key={i + 1} className={this.props.currentRoute.path.indexOf(item.pathname) === 0 ? 'active' : ''}>
                    <a href={item.pathname}>{item.text}</a>
                  </li>
                )}
              </ul>
            </nav>
          </header>
        )
    }
}
