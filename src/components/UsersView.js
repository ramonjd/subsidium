import React, { Component, PropTypes } from 'react'
import Immutable from 'seamless-immutable'
import { Link } from 'react-router'
import Button from './Button'

export default class UsersView extends Component {

  static propTypes = {
    users:  PropTypes.arrayOf(React.PropTypes.object).isRequired
   }

   constructor(props) {
     super(props)
   }

  render () {

    const { users, actions } = this.props
    let usersList = Immutable(users).asMutable().map((user, i) => {
      return (
        <li key={ i }>
          <Link to={`/users/${user._id}`}>{ user.username }</Link>
        </li>)
    })

    return (
      <ul className="UsersView">
      { usersList }
     </ul>
    )
  }
}
