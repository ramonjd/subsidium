//https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/components/Main.js
// http://notjoshmiller.com/ajax-polling-in-react-with-redux/
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

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
export default class Users extends Component {

  static propTypes = {
     children: PropTypes.node
   }

  constructor() {
    super()
  }

  render () {
    return (
      <section className="Users">
        <h1>Users </h1>
        ... user stats, find user, 
        <Link to="/users/all">Browse users</Link>
        {this.props.children}
     </section>
    )
  }
}
