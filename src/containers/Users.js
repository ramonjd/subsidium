//https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/components/Main.js
// http://notjoshmiller.com/ajax-polling-in-react-with-redux/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {userActions} from '../actions/'
import ItemListView from '../components/ItemListView'
import UserCreateEdit from '../components/UserCreateEdit'

// function mapStateToProps(state) {
//   console.log('statesss', state)
//   return { users: state.users }
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(userActions, dispatch)
// }
//
//
// @connect(mapStateToProps, mapDispatchToProps)



class Users extends Component {

  static propTypes = {
    users:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
    actions : PropTypes.objectOf(React.PropTypes.func).isRequired
   }


  constructor(props) {
    super(props)
    this.handleDeleteUsers = this.handleDeleteUsers.bind(this)
    this.handleCreateUser  = this.handleCreateUser.bind(this)
  }

  componentWillMount() {
      this.props.actions.getUsers()
  }

  handleDeleteUsers(userIds){
    console.log(userIds)
  }

  handleCreateUser(userData){
    this.props.actions.createUser(this.props.users, userData)
  }

  render () {
    const {users, actions} = this.props
    console.log('users', users)
    return (
      <section className="Users">
        <h1>Users</h1>
        <div className="leftCol">
          <ItemListView items={ users } deleteItems={this.handleDeleteUsers} apiPath="users"/>
        </div>
        <div className="rightCol">
          <UserCreateEdit title="Create" onSubmit={ this.handleCreateUser } />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Users)
