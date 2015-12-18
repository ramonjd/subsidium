import React from 'react'
import { Router, Route, Redirect, RoutingContext } from 'react-router'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import Users from './containers/Users'
import UserProfile from './containers/UserProfile'
import Tasks from './containers/Tasks'
import DataWrapper from './containers/DataWrapper'

export const routes = (
  <Route path='/' component={App}>
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/users' component={Users} />
    <Route path='/users/:id' component={UserProfile} />
  </Route>
)

export function buildRouter(initialState, renderProps){
  if (process.env.BROWSER) {
    return (<DataWrapper data={ initialState }><Router {...renderProps}>{ routes }</Router></DataWrapper>)
  } else {
    return (<DataWrapper data={ initialState }><RoutingContext {...renderProps} /></DataWrapper>)
  }
}
