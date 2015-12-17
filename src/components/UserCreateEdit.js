if (process.env.BROWSER) {
  require('../styles/UserCreateEdit.scss')
}

//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'
import Button from './Button'

//import {autobind} from 'core-decorators';

let getInitialState = () => {
    return {
      editMode : false,
      disableFields : false,
      user : {
        name : '',
        email : ''
      }
    }
}

export default class UserCreateEdit extends Component {

  static propTypes = {
    title : PropTypes.string.isRequired,
    user:  PropTypes.object,
    onSubmit : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = getInitialState()
    this.handleInputChange  = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleDisableFields = this.toggleDisableFields.bind(this)
  }

  componentDidMount() {
      if (this.props.user) {
        this.setState({
          editMode : true,
          disableFields : true,
          user : {
            name : this.props.user.name,
            email : this.props.user.email
          }
        })
      }
  }

  toggleDisableFields(){
    const disableFields = !this.state.disableFields
    this.setState({ disableFields : disableFields })
  }

  handleInputChange(e){
    let userTemp = this.state.user
    userTemp[e.target.id] =  e.target.value
    this.setState({ user : userTemp })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit(this.state.user)
    if (!this.props.user) {
      this.setState(getInitialState())
    } else {
      this.setState({ disableFields : true })
    }
  }

  render () {
    const {title} = this.props
    const user = this.props.user || {}

    return (
      <div className="UserCreateEdit">
      <form className={title} onSubmit={this.handleSubmit}>
        <fieldset>
          { this.state.editMode ? <Button className={this.state.disableFields ? '' : 'editing'} title="Toggle edit mode" onClick={this.toggleDisableFields}>✎</Button> : null }
          <legend>{title} user</legend>
          <div className="formControlGroup">
            <label htmlFor="name">
              <span>Name</span>
              <input autofocus disabled={this.state.disableFields} required pattern="^[a-zA-Z0-9\_\-\.]{1,20}$" type="text" id="name" placeholder="name" name="name" defaultValue={user.name || ''} onChange={this.handleInputChange} value={this.state.user.name}/>
            </label>
          </div>
          <div className="formControlGroup">
            <label htmlFor="email">
              <span>Email</span>
              <input required disabled={this.state.disableFields} type="email" id="email" placeholder="you@you.com" name="email" defaultValue={user.email || ''} value={this.state.user.email} onChange={this.handleInputChange} />
            </label>
          </div>
          <Button type="submit" disabled={this.state.disableFields} className="submitForm">{title} user</Button>
        </fieldset>
     </form>
     </div>
    )
  }
}
