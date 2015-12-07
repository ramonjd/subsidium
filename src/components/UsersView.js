import React, { Component, PropTypes } from 'react'
import Immutable from 'seamless-immutable'
import { Link } from 'react-router'

export default class UsersView extends Component {

  static propTypes = {
     users:  PropTypes.arrayOf(PropTypes.shape({
       username: PropTypes.string.isRequired,
    })).isRequired,
    actions : PropTypes.objectOf(React.PropTypes.func)
   }

   constructor(props) {
     super(props)
   }

  render () {

    const { users, actions } = this.props
    let usersList = Immutable(users).asMutable().map((user, i) => {
      return <li key={ i }><Link to={`/users/${user._id}`}>{ user.username }</Link></li>
    })

    return (
      <ul className="UsersView">
      { usersList }
     </ul>
    )
  }
}
