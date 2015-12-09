import React, { Component, PropTypes } from 'react'
import Immutable from 'seamless-immutable'
import { Link } from 'react-router'
import Button from './Button'

export default class UsersView extends Component {

  static propTypes = {
    users:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
    editUser : React.PropTypes.func.isRequired,
    deleteUser : React.PropTypes.func.isRequired
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
          <Button onClick={this.props.editUser.bind(this, user._id)}>Edit</Button>
          <Button>Delete</Button>
        </li>)
    })

    return (
      <ul className="UsersView">
      { usersList }
     </ul>
    )
  }
}
