//https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/components/Main.js
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../actions/'
import UsersView from '../components/UsersView'
import UsersCreate from '../components/UsersCreate'

// function mapStateToProps(state) {
//   console.log('statesss', state)
//   return { users: state.users }
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(UserActions, dispatch)
// }
//
//
// @connect(mapStateToProps, mapDispatchToProps)
class Users extends Component {

  static propTypes = {
     users:  PropTypes.array,
     actions : PropTypes.object
   }

  constructor() {
    super()
  }

  render () {
    const {users, actions} = this.props;
    return (
      <section className="Users">
        <h1>Users</h1>
        <UsersView users={ users } actions={ actions } />
        <UsersCreate createUser={ actions.createUser } />
     </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Users)
