if (process.env.BROWSER) {
  require('../styles/UserCreateEdit.scss')
}

//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'
import Immutable from 'seamless-immutable'

//import {autobind} from 'core-decorators';

let getState = () => {
    return {
        username : '',
        email : ''
    };
};


export default class UserCreateEdit extends Component {

  static propTypes = {
    title : React.PropTypes.string.isRequired,
    users:  PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit : PropTypes.func.isRequired,
    userId : PropTypes.string.isRequired
  }

   constructor() {
     super()
     this.handleSubmit = this.handleSubmit.bind(this)
     this.findUserById = this.findUserById.bind(this)


   }
   componentWillMount() {
       this.state = this.findUserById()
   }
   findUserById(){
     let userProfile
     if (this.props.userId !== '') {
       console.log('this.props.userId', this.props.userId)
       const { userId, users} = this.props


       users.forEach((user, i) => {
         if (user._id === userId) {
           console.log('user', user)
           userProfile =  user
         }
       })

     } else {
       userProfile = getState()
     }
     this.setState({username: userProfile.username, email : userProfile.email});
   }

   //@autobind
   handleSubmit(e) {
     e.preventDefault()
     let body ={
       username : this.refs.username.value,
       email : this.refs.email.value
     }
     if (this.props.userId !== '') {
       body.id = this.props.userId
     }
      this.props.onSubmit(this.props.users, body)
   }



  render () {
    return (
      <form className="UserCreateEdit" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>{this.props.title}</legend>
          <label htmlFor="username">
            <span>Username</span>
            <input autofocus required ref="username" pattern="^[a-zA-Z]{1,20}$" type="text" id="username" placeholder="username" name="username" defaultValue={this.state.username}/>
          </label>
          <label htmlFor="email">
            <span>Email</span>
            <input ref="email" required type="email" id="email" placeholder="you@you.com" name="email" defaultValue={this.state.email} />
          </label>
          <button type="submit">{this.props.title}</button>
        </fieldset>
     </form>
    )
  }
}
