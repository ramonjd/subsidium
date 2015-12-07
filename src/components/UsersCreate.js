if (process.env.BROWSER) {
  require('../styles/UsersCreate.scss')
}

//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'
//import {autobind} from 'core-decorators';

export default class UsersView extends Component {

  static propTypes = {
    actions : PropTypes.objectOf(React.PropTypes.func)
  }

   constructor() {
     super()
     this.handleSubmit = this.handleSubmit.bind(this)
   }

   //@autobind
   handleSubmit(e) {
     e.preventDefault()
      this.props.createUser({
        username : this.refs.username.value,
        phone : this.refs.phone.value,
        email : this.refs.email.value
      })
   }

  render () {
    return (
      <form className="UsersCreate" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Create new user</legend>
          <label htmlFor="username">
            <span>Username</span>
            <input autofocus required ref="username" pattern="^[a-zA-Z]{1,20}$" type="text" id="username" placeholder="username" name="username"/>
          </label>
          <label htmlFor="phone">
            <span>Phone</span>
            <input ref="phone" pattern="[0-9]+" type="tel" id="phone" placeholder="07012345678" name="phone"/>
            </label>
          <label htmlFor="email">
            <span>Email</span>
            <input ref="email" required type="email" id="email" placeholder="you@you.com" name="email"/>
          </label>
          <button type="submit">Create</button>
        </fieldset>
     </form>
    )
  }
}
