//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator';

export default class UsersView extends Component {

  static propTypes = {

   }

  render () {

    const { users, actions } = this.props;

    constructor() {
      super();
    }

    @autobind
    handleClick(e) {
      e.preventDefault()
      console.log(e)
      // this.props.createUser({
      //
      // });
    }

    return (
      <form className="UsersCreate" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Create new user</legend>
          <label for="username"><input autofocus required pattern="^[a-zA-Z]{1,20}$" type="text" id="username" placeholder="username" name="username"/></label>
          <label for="password"><input id="password" placeholder="username" name="username"/></label>
          <label for="phone"><input pattern="[0-9]+" type="tel" id="phone" placeholder="07012345678" name="phone"/></label>
          <label for="email"><input required type="email" id="email" placeholder="you@you.com" name="email"/></label>
          <button type="submit">Create</button>
        </fieldset>
     </form>
    )
  }
}
