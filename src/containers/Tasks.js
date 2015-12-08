//https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/components/Main.js
// http://notjoshmiller.com/ajax-polling-in-react-with-redux/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {taskActions} from '../actions/'
import TasksView from '../components/TasksView'
import TaskCreate from '../components/TaskCreate'


class Tasks extends Component {

  static propTypes = {
    tasks:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
    actions : PropTypes.objectOf(React.PropTypes.func).isRequired
   }

  constructor() {
    super()
  }
  componentWillMount() {
      this.props.actions.getTasks()
  }
  render () {
    const {tasks, actions} = this.props
    return (
      <section className="Tasks">
        <h1>Tasks</h1>
        <TasksView tasks={ tasks } actions={ actions } />
        <TaskCreate tasks={ tasks } createTask={ actions.createTask } />
     </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    router: state.router
  }
}

function mapDispatchToProps(dispatch) {
  return { actions : bindActionCreators(taskActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
