import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Dashboard from '../containers/Dashboard'
import Users from '../containers/Users'
import UserProfile from '../containers/UserProfile'
import UsersView from '../containers/UsersView'

//import UserCreate from '../containers/UserCreate'

// <IndexRoute component={Dashboard} />
//      <Route path='new' component={UserCreate} />

export default (
  <Route path='/' component={Dashboard}>
    <Route path='users' component={Users}>
      <Route path='all' component={UsersView} />
      <Route path=':id' component={UserProfile} />
    </Route>
  </Route>
)
