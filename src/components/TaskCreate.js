if (process.env.BROWSER) {
  require('../styles/TaskCreate.scss')
}

//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'
//import {autobind} from 'core-decorators';

export default class TaskCreate extends Component {

  static propTypes = {
    tasks:  PropTypes.arrayOf(PropTypes.object).isRequired,
    createTask : PropTypes.func.isRequired
  }

   constructor() {
     super()
     this.handleSubmit = this.handleSubmit.bind(this)
   }

   //@autobind
   handleSubmit(e) {
     e.preventDefault()
      this.props.createTask(this.props.tasks, {
        name : this.refs.name.value,
        description : this.refs.description.value,
        type : this.refs.taskType.value
      })
   }

  render () {
    return (
      <form className="TaskCreate" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Create new task</legend>
          <label htmlFor="name">
            <span>Taskname</span>
            <input autofocus required ref="name" pattern="^[a-zA-Z]{1,20}$" type="text" id="name" placeholder="Task name" name="name"/>
          </label>
          <label htmlFor="description">
            <span>Email</span>
            <input ref="description" required type="text" id="description" placeholder="Task description" name="description"/>
          </label>
          <label htmlFor="description">
            <span>Task type</span>
            <input ref="taskType" type="radio" id="description" name="taskType" value="1"  /> Credits your time (e.g., support hours)
            <input ref="taskType" type="radio" id="description" name="taskType" value="-1"/> Debits your time (e.g., time off)
          </label>
          <button type="submit">Create</button>
        </fieldset>
     </form>
    )
  }
}
