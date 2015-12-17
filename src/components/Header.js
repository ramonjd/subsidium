if (process.env.BROWSER) {
  require('../styles/Header.scss')
}


import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { ui } from '../constants/'

export default class Header extends Component {
    static propTypes = {
      navItems : PropTypes.array
    }
    render() {
        return (
          <header className="Header">
            <span className="Logo"><Link to="/">subsidium</Link></span>
            <nav>
              <ul>
                {this.props.navItems.map((item, i) =>
                  <li  key={i + 1}>
                    <Link to={item.pathname} activeStyle={ui.ACITVE_CLASS}>{item.text}</Link>
                  </li>
                )}
              </ul>
            </nav>
          </header>
        )
    }
}
