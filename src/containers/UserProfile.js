//https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/components/Main.js
// http://notjoshmiller.com/ajax-polling-in-react-with-redux/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../actions/'
import Immutable from 'seamless-immutable'

class UserProfile extends Component {

  constructor(props) {
    super(props)
    this.getUserById = this.getUserById.bind(this)
  }
  // 
  // componentWillMount() {
  //     this.props.actions.getUserById()
  // }

  getUserById(id) {
    return Immutable(this.props.users).asMutable().map((user, i) => {
      if (user._id === id) {
        return (
          <div className="" key={user._id}>
            <h3>{ user.username } { user.email }</h3>
          </div>
        )
      }
    })
  }

  render () {
    const { params: { id }} = this.props
    return (
      <section className="UserProfile">
        <h1>User Profile </h1>
        {this.getUserById(id)}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
