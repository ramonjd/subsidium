if (process.env.BROWSER) {
  require('../styles/UserCreateEdit.scss')
}

//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'

//import {autobind} from 'core-decorators';



let getInitialState = () => {
    return {
      name : '',
      email : ''
    }
}


export default class UserCreateEdit extends Component {

  static propTypes = {
    title : React.PropTypes.string.isRequired,
    user:  PropTypes.object,
    onSubmit : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = getInitialState()
    this.handleInputChange  = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
      if (this.props.user) {
        this.setState(this.props.user)
      }
  }

  handleInputChange(e){
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState(getInitialState())
  }

  render () {
    const {title} = this.props
    return (
      <div className="UserCreateEdit">
      <form className={title} onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>{title} user</legend>
          <div className="formControlGroup">
            <label htmlFor="name">
              <span>name</span>
              <input autofocus required pattern="^[a-zA-Z0-9\-\.]{1,20}$" type="text" id="name" placeholder="name" name="name" onChange={this.handleInputChange} value={this.state.name}/>
            </label>
          </div>
          <div className="formControlGroup">
            <label htmlFor="email">
              <span>Email</span>
              <input required type="email" id="email" placeholder="you@you.com" name="email" value={this.state.email} onChange={this.handleInputChange} />
            </label>
          </div>
          <button type="submit">{title} user</button>
        </fieldset>
     </form>
     </div>
    )
  }
}
