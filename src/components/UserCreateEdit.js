if (process.env.BROWSER) {
  require('../styles/UserCreateEdit.scss')
}

//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'

//import {autobind} from 'core-decorators';


export default class UserCreateEdit extends Component {

  static propTypes = {
    title : React.PropTypes.string.isRequired,
    user:  PropTypes.object.isRequired,
    onSubmit : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit(e)
  }

  render () {
    const { user} = this.props
    return (
      <form className="UserCreateEdit" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>{this.props.title} user</legend>
          <label htmlFor="username">
            <span>Username</span>
            <input autofocus required ref="username" pattern="^[a-zA-Z]{1,20}$" type="text" id="username" placeholder="username" name="username" defaultValue={user.username}/>
          </label>
          <label htmlFor="email">
            <span>Email</span>
            <input ref="email" required type="email" id="email" placeholder="you@you.com" name="email" defaultValue={user.email} />
          </label>
          <button type="submit">{this.props.title} user</button>
        </fieldset>
     </form>
    )
  }
}
