import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import users from './users'

const rootReducer = combineReducers({
  users,
  router
})

export default rootReducer
