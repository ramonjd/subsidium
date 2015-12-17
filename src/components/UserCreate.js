if (process.env.BROWSER) {
  require('../styles/UsersCreate.scss')
}

//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'
//import {autobind} from 'core-decorators';

export default class UserCreate extends Component {

  static propTypes = {
    users:  PropTypes.object,
    actions : PropTypes.objectOf(React.PropTypes.func)
   }

   constructor() {
     super()
     this.handleSubmit = this.handleSubmit.bind(this)
   }

   //@autobind
   handleSubmit(e) {
     e.preventDefault()
      this.props.createUser(this.props.users, {
        username : this.refs.username.value,
        email : this.refs.email.value
      })
   }

  render () {
    return (
      <div className="UserCreate">
        <h1>Create new user</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Create new user</legend>
            <label htmlFor="username">
              <span>Username</span>
              <input autofocus required ref="username" pattern="^[a-zA-Z]{1,20}$" type="text" id="username" placeholder="username" name="username"/>
            </label>
            <label htmlFor="email">
              <span>Email</span>
              <input ref="email" required type="email" id="email" placeholder="you@you.com" name="email"/>
            </label>
            <button type="submit">Create</button>
          </fieldset>
       </form>
      </div>
    )
  }
}
