if (process.env.BROWSER) {
  require('../styles/Users.scss')
}
import React, { Component, PropTypes } from 'react'
import usersActions from '../flux/actions/usersActions'
import usersStore from '../flux/stores/usersStore'
import ItemListView from '../components/ItemListView'
import UserCreateEdit from '../components/UserCreateEdit'


let getInitialState = () => {
    return {
        users : []
    }
}

export default class Users extends Component {

  static getState = () => {
    return usersStore.getUsers()
  }

  static propTypes = {
    users:  PropTypes.arrayOf(PropTypes.object)
  }

  constructor(props, context) {
    super(props, context)
    this.state = getInitialState()
    this.handleCreateUser  = this.handleCreateUser.bind(this)
    this.onCreatedUser  = this.onCreatedUser.bind(this)
  }

  componentWillMount() {
    this.setState({
      users : this.props.users
    })
    //this.getState(this.props.params.id)
     usersStore.addChangeListener(this.onCreatedUser)
    // usersStore.addDeleteListener(this.onDeletedUser)
  }

  componentWillUnmount() {
    usersStore.removeChangeListener(this.onCreatedUser)
    // usersStore.removeDeleteListener(this.onDeletedUser)
  }

  handleCreateUser(userData){
    usersActions.createUser(userData)
  }

  onCreatedUser(userData){
    console.log('onCreatedUser',userData )
    this.setState({
      users : userData
    })
  }

  render () {
    const { users } = this.state
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
