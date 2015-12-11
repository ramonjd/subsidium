if (process.env.BROWSER) {
  require('../styles/Dashboard.scss')
}
//https://github.com/rackt/redux-router/blob/master/examples/basic/index.js
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


export default class Dashboard extends Component {

  static propTypes = {
    children: PropTypes.node
  }

  constructor() {
    super()
  }

  render() {
        const navItems = [
          {
            text : 'Dashboard',
            pathname : '/'
          },
          {
            text : 'Tasks',
            pathname : '/tasks'
          },
          {
            text : 'Users',
            pathname : '/users'
          },
          {
            text : 'Settings',
            pathname : '/settings'
          }
        ]
        return  (
          <section className="Dashboard">
            <header>
              <span className="Logo">subsidium</span>
              <nav>
                <ul>
                  {navItems.map((item, i) =>
                    <li  key={i + 1} className={this.props.location.pathname === item.pathname ? 'active' : ''}>
                      <Link to={item.pathname}>{item.text}</Link>
                    </li>
                  )}
                </ul>
              </nav>
            </header>
            <main>{this.props.children}</main>
          </section>
          )
  }
}
