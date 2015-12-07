import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Dashboard from '../containers/Dashboard'
import Users from '../containers/Users'
import UserProfile from '../containers/UserProfile'

// <IndexRoute component={Dashboard} />
//      <Route path='new' component={UserCreate} />

export default (
  <Route path='/' component={Dashboard}>
    <Route path='users' component={Users} />
    <Route path='users/:id' component={UserProfile} />
  </Route>
)
