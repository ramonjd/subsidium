//https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/components/Main.js
// http://notjoshmiller.com/ajax-polling-in-react-with-redux/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {userActions} from '../actions/'
import UsersView from '../components/UsersView'
import UserCreateEdit from '../components/UserCreateEdit'
import Button from '../components/Button'

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

let getState = () => {
    return {
        currentUserId : '',
        showUserCreate : false,
        mode : 'create'
    };
};

class Users extends Component {

  static propTypes = {
    users:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
    actions : PropTypes.objectOf(React.PropTypes.func).isRequired
   }


  constructor(props) {
    super(props)
    this.state = getState()
    this.handleCreateNewUser = this.handleCreateNewUser.bind(this)
    this.handleEditUser = this.handleEditUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.toggleUserCreateEditPanel = this.toggleUserCreateEditPanel.bind(this)
  this.createUserCreateEditNode = this.createUserCreateEditNode.bind(this)
this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {
      this.props.actions.getUsers()
  }

  toggleUserCreateEditPanel(state){
    let toggle = state !== undefined ? state : !this.state.showUserCreate
    this.setState({showUserCreate: toggle});
  }

  handleCreateNewUser(){
    this.setState({mode: 'create'});
    this.toggleUserCreateEditPanel(true)
  }

  handleEditUser(id){
    console.log('handleEditUser', id)
    this.setState({mode: 'edit', currentUserId : id})
    this.toggleUserCreateEditPanel(true)
  }

  handleDeleteUser(id){

  }

  onSubmit(users, data){
    if (this.state.mode === 'edit') {
         actions.updateUser(data.id, data)

    } else {
        actions.createUser(users, data)
    }
  }

  createUserCreateEditNode(){
    const {users, actions} = this.props

    let onSubmit
    let title
    if (this.state.mode === 'edit') {
        title = 'Edit user'
    } else {
        title = 'Create new user'
    }


    console.log(onSubmit)

    return (
      <UserCreateEdit title={title} users={ users } onSubmit={ this.onSubmit } userId={this.state.currentUserId}/>
    )
  }

  render () {
    const {users, actions} = this.props
    return (
      <section className="Users">
        <h1>Users </h1>
        <UsersView users={ users } editUser={this.handleEditUser} deleteUser={this.handleDeleteUser}/>
        <Button onClick={this.handleCreateNewUser}>Create a new user</Button>
        { this.state.showUserCreate ? this.createUserCreateEditNode() : null }
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
