
import React, { Component, PropTypes, contextTypes } from 'react'
import usersActions from '../flux/actions/usersActions'
import usersStore from '../flux/stores/usersStore'
import Immutable from 'seamless-immutable'
import UserCreateEdit from '../components/UserCreateEdit'
import Button from '../components/Button'
import Modal from '../components/Modal'

let getInitialState = () => {
    return {
        user : {},
        showModal : false
    }
}

export default class UserProfile extends Component {


  static contextTypes = {
    location: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    console.log(this.props, this.context)
    this.state = getInitialState()
    this.handleUpdateUser = this.handleUpdateUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.onGetUser = this.onGetUser.bind(this)
    this.onDeletedUser = this.onDeletedUser.bind(this)
    this.onDeleteUser = this.onDeleteUser.bind(this)
    this.onCancelDeleteUser = this.onCancelDeleteUser.bind(this)
  }

  componentWillMount() {
    usersActions.getUserById(this.props.params.id)
    usersStore.addChangeListener(this.onGetUser)
    usersStore.addDeleteListener(this.onDeletedUser)
  }

  componentWillUnmount() {
    usersStore.removeChangeListener(this.onGetUser)
    usersStore.removeDeleteListener(this.onDeletedUser)
  }

  onGetUser(data) {
    console.log('onGetUser User profile: ',  data[0])
    const user = data[0].asMutable()
    this.setState({
        user: user
    })
  }

  onDeletedUser(data) {
    const { params: { id }} = this.props
    this.props.history.pushState(null, '/users')
  }


  handleUpdateUser(userData){
    const { params: { id }} = this.props
    usersActions.updateUser(id, userData)
  }

  handleDeleteUser(){
    const { params: { id }} = this.props
    usersActions.deleteUser(id)
  }

  onDeleteUser(){
    this.setState({
        showModal: true
    })
  }

  onCancelDeleteUser(){
    this.setState({
        showModal: false
    })
  }

  render () {
    const { params: { id }} = this.props

    return (
      <div className="UserProfile">
        <h1>{ this.state.user.name } - User Profile </h1>
        { this.state.user._id === id ? <UserCreateEdit title="Edit" user={ this.state.user } onSubmit={ this.handleUpdateUser } /> : null }
        <Button className="DeleteItemButton" title="Delete this user" onClick={this.onDeleteUser}>&#10006;</Button>
        { this.state.showModal ? <Modal show={this.state.showModal}  cancelText="No" affirmText="Yes, delete" title="Are you sure you want to delete this user?" content={this.state.user.name} onAffirm={this.handleDeleteUser} onCancel={this.onCancelDeleteUser}  /> : null }
     </div>
    )
  }

}
