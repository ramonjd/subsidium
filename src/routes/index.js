import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Dashboard from '../containers/Dashboard'
import Users from '../containers/Users'
import UserProfile from '../containers/UserProfile'
import Tasks from '../containers/Tasks'

// <IndexRoute component={Dashboard} />
//      <Route path='new' component={UserCreate} />

export default (
  <Route path='/' component={Dashboard}>
    <Route path='tasks' component={Tasks} />
    <Route path='users' component={Users} />
    <Route path='users/:id' component={UserProfile} />
  </Route>
)
