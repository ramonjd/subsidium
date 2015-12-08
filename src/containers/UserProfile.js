//https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/components/Main.js
// http://notjoshmiller.com/ajax-polling-in-react-with-redux/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { userActions } from '../actions/'
import Immutable from 'seamless-immutable'

class UserProfile extends Component {


  static propTypes = {
    users:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
    actions : PropTypes.objectOf(React.PropTypes.func).isRequired
   }

  constructor() {
    super()
  }

  componentWillMount() {
      this.props.actions.getUsers()
  }

  render () {
    const { params: { id }, users} = this.props
    let userProfile = Immutable(users).asMutable().map((user, i) => {
      if (user._id === id) {
        return (
          <div className="" key={user._id}>
            <h3>{ user.username } { user.email }</h3>
          </div>
        )
      }
    })

    return (
      <section className="UserProfile">
        <h1>User Profile </h1>
        {userProfile}
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
  return { actions : bindActionCreators(userActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
