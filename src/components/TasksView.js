import React, { Component, PropTypes } from 'react'
import Immutable from 'seamless-immutable'
import { Link } from 'react-router'

export default class TasksView extends Component {

  static propTypes = {
    tasks:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
    actions : PropTypes.objectOf(React.PropTypes.func).isRequired
   }

   constructor(props) {
     super(props)
   }

  render () {

    const { tasks, actions } = this.props
    console.log('TasksView', tasks)
    let tasksList = Immutable(tasks).asMutable().map((task, i) => {
      return <li key={ i }><Link to={`/tasks/${task._id}`}>{ task.name } { task.created }</Link></li>
    })

    return (
      <ul className="TasksView">
      { tasksList }
     </ul>
    )
  }
}
