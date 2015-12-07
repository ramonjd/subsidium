//https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/components/Main.js
// http://notjoshmiller.com/ajax-polling-in-react-with-redux/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../actions/'
import UsersView from '../components/UsersView'
import UserCreate from '../components/UserCreate'

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
     actions : PropTypes.object,
     children: PropTypes.node
   }

  constructor() {
    super()
  }
  componentWillMount() {
      this.props.actions.getUsers()
  }
  render () {
    const {users, actions} = this.props
    return (
      <section className="Users">
        <h1>Users </h1>
        <UsersView users={ users } actions={ actions } />
        <UserCreate users={ users } createUser={ actions.createUser } />
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
