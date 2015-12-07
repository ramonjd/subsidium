//https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/components/Main.js
// http://notjoshmiller.com/ajax-polling-in-react-with-redux/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../actions/'
import Immutable from 'seamless-immutable'
import { Link } from 'react-router'

class UsersView extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
      this.props.actions.getUsers()
  }

  render () {

    const { users, actions } = this.props
    let usersList = Immutable(users).asMutable().map((user, i) => {
      return <li key={ i }><Link to={`/users/${user._id}`}>{ user.username }</Link></li>
    })
    console.log(this.props)
    return (
      <div className="UsersView">
      <h2>All users</h2>
        <ul>
        { usersList }
       </ul>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    users: state.users,
    router: state.router
  }
}

function mapDispatchToProps(dispatch) {
  return { actions : bindActionCreators(UserActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersView)
