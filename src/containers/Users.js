if (process.env.BROWSER) {
  require('../styles/Users.scss')
}
import React, { Component, PropTypes } from 'react'
import usersActions from '../flux/actions/usersActions'
import usersStore from '../flux/stores/usersStore'
import ItemListView from '../components/ItemListView'
import UserCreateEdit from '../components/UserCreateEdit'

export default class Users extends Component {

  static getState = () => {
    return usersStore.getUsers()
  }

  static propTypes = {
    users:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.handleCreateUser  = this.handleCreateUser.bind(this)
  }

  handleCreateUser(userData){
    usersActions.createUser(userData)
  }

  render () {
    const { users } = this.props
    return (
      <div className="Users">
        <h1>Users</h1>
        <div className="row">
          <div className="col">
            <UserCreateEdit title="Create" onSubmit={this.handleCreateUser}/>
          </div>
          <div className="col">
          {users ? <ItemListView items={ users } apiPath="users"/> : null}
          </div>
        </div>
     </div>
    )
  }
}
