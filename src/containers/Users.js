if (process.env.BROWSER) {
  require('../styles/Users.scss')
}
import React, { Component, PropTypes } from 'react'
import usersActions from '../flux/actions/usersActions'
import usersStore from '../flux/stores/usersStore'
import ItemListView from '../components/ItemListView'
import UserCreateEdit from '../components/UserCreateEdit'

let getInitialState = (state = []) => {
    return {
        users : state || []
    }
}

export default class Users extends Component {

  static getState = () => {
    return usersStore.getUsers()
  }
  static propTypes = {
    state: PropTypes.object
  }
  // static contextTypes = {
  //     data: React.PropTypes.object.isRequired
  // }

  constructor(props, context) {
    super(props, context)
    console.log(this.props)
    this.state = getInitialState()
    this.onGetUsers  = this.onGetUsers.bind(this)
    this.handleCreateUser  = this.handleCreateUser.bind(this)
  }

  componentDidMount() {
    //usersActions.getUsers()
    usersStore.addChangeListener(this.onGetUsers)
  }

  componentWillUnmount() {
     usersStore.removeChangeListener(this.onGetUsers)
  }

  onGetUsers(data) {
    this.setState({
      users: data
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
  }

  handleCreateUser(userData){
    usersActions.createUser(userData)
  }

  render () {
//            <ItemListView items={ this.props.users } apiPath="users"/>
    const { users } = this.props
    console.log('users', users)
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
