if (process.env.BROWSER) {
  require('../styles/TaskCreateEdit.scss')
}

//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'
//import {autobind} from 'core-decorators';


export default class TaskCreateEdit extends Component {

  static propTypes = {
    title : React.PropTypes.string.isRequired,
    task:  PropTypes.object.isRequired,
    onSubmit : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit({
      name : e.target.elements.name.value,
      description : e.target.elements.description.value,
      type : parseInt(e.target.elements.type.value)
    })
  }

  render () {
    const {task} = this.props
    return (
      <form className="TaskCreateEdit" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>{this.props.title} task</legend>
          <div className="formControlGroup">
            <label htmlFor="name">
              <span>Taskname</span>
              <input autofocus required pattern="^[a-zA-Z]{1,20}$" type="text" id="name" placeholder="Task name" name="name" defaultValue={task.name} />
            </label>
          </div>
          <div className="formControlGroup">
            <label htmlFor="description">
              <span>Email</span>
              <input required type="text" id="description" placeholder="Task description" name="description" defaultValue={task.description}/>
            </label>
          </div>
          <div className="formControlGroup">
            <span>Task type</span>
              <label htmlFor="typeCredit"><input type="radio" id="typeCredit" name="type" value="1" defaultChecked="{task.type == 1}" /> Credits your time (e.g., support hours)</label>
              <label htmlFor="typeDebit"><input type="radio" id="typeDebit" name="type" value="-1" defaultChecked="{task.type == -1}" /> Debits your time (e.g., time off)</label>
          </div>
          <button type="submit">{this.props.title} task</button>
        </fieldset>
     </form>
    )
  }
}
