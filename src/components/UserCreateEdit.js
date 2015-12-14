if (process.env.BROWSER) {
  require('../styles/UserCreateEdit.scss')
}

//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'

//import {autobind} from 'core-decorators';



let getInitialState = () => {
    return {
        user : {
          name : '',
          email : ''
        }
    }
}


export default class UserCreateEdit extends Component {

  static propTypes = {
    title : React.PropTypes.string.isRequired,
    user:  PropTypes.object.isRequired,
    onSubmit : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = getInitialState()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit({
      name : e.target.elements.name.value,
      email : e.target.elements.email.value
    })
  }

  render () {
    const {user, title} = this.props
    return (
      <div className="UserCreateEdit">
      <form className={title} onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>{title} user</legend>
          <div className="formControlGroup">
            <label htmlFor="name">
              <span>name</span>
              <input autofocus required pattern="^[a-zA-Z0-9\-\.]{1,20}$" type="text" id="name" placeholder="name" name="name" defaultValue={user.name}/>
            </label>
          </div>
          <div className="formControlGroup">
            <label htmlFor="email">
              <span>Email</span>
              <input required type="email" id="email" placeholder="you@you.com" name="email" defaultValue={user.email} />
            </label>
          </div>
          <button type="submit">{title} user</button>
        </fieldset>
     </form>
     </div>
    )
  }
}
