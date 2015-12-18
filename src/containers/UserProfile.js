
import React, { Component, PropTypes, contextTypes } from 'react'
import usersActions from '../flux/actions/usersActions'
import stores from '../flux/stores/'
import Immutable from 'seamless-immutable'
import UserCreateEdit from '../components/UserCreateEdit'
import Button from '../components/Button'
import Modal from '../components/Modal'

let getInitialState = () => {
    return {
        user : {  },
        showModal : false
    }
}

export default class UserProfile extends Component {

  static getState = (params) => {
    return stores.userprofile.getUserById(params.id)
  }

  static propTypes = {
    userprofile:  PropTypes.object
  }

  static contextTypes = {
    location: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    this.state = getInitialState()
    this.handleUpdateUser = this.handleUpdateUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.onGetUser = this.onGetUser.bind(this)
    this.onDeletedUser = this.onDeletedUser.bind(this)
    this.onDeleteUser = this.onDeleteUser.bind(this)
    this.onCancelDeleteUser = this.onCancelDeleteUser.bind(this)
    this.renderProfile = this.renderProfile.bind(this)

  }

  componentWillMount() {
    this.setState({
      user : this.props.userprofile
    })
    stores.userprofile.addChangeListener(this.onGetUser)
    stores.users.addDeleteListener(this.onDeletedUser)
  }

  componentWillUnmount() {
    stores.userprofile.removeChangeListener(this.onGetUser)
    stores.users.removeDeleteListener(this.onDeletedUser)
  }

  onGetUser(data) {
    const userprofile = data.asMutable()
    this.setState({
        user: userprofile
    })
  }

  onDeletedUser(data) {
    window.location.href = '/users'
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

  renderProfile(){
    const { params: { id } } = this.props
    return (
        <div>
          <h1>{ this.state.user.name } - User Profile </h1>
          { this.state.user._id === id ? <UserCreateEdit title="Edit" user={ this.state.user } onSubmit={ this.handleUpdateUser } /> : null }
          <Button className="DeleteItemButton" title="Delete this user" onClick={this.onDeleteUser}>&#10006;</Button>
          { this.state.showModal ? <Modal show={this.state.showModal}  cancelText="No" affirmText="Yes, delete" title="Are you sure you want to delete this user?" content={this.state.user.name} onAffirm={this.handleDeleteUser} onCancel={this.onCancelDeleteUser}  /> : null }
        </div>
    )
  }

  render () {


    const noprofile = (
      <div>
        <p>Sorry, no profile found.</p>
      </div>
    )

    return (
      <div className="UserProfile">
        { this.props.userprofile ? this.renderProfile()  :  noprofile  }
     </div>
    )
  }

}
