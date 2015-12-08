import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import users from './users'
import tasks from './tasks'

const rootReducer = combineReducers({
  users,
  tasks,
  router
})

export default rootReducer
