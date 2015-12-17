import React from 'react'
import { Router, Route, Redirect, RoutingContext } from 'react-router'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import Users from './containers/Users'
import UserProfile from './containers/UserProfile'
import Tasks from './containers/Tasks'
import DataWrapper from './containers/DataWrapper'



// https://ponyfoo.com/articles/universal-routing-react-es6
// https://github.com/rackt/react-router/blob/latest/docs/Introduction.md

let routes
//           <Redirect from='/' to='dashboard' />

if (process.env.BROWSER) {
  routes = (
          <Route path='/' component={App}>
            <Route path='dashboard' component={Dashboard} />
            <Route path='users' component={Users} />
            <Route path='users/:id' component={UserProfile} />
          </Route>
  )
} else {
  routes = (
      <Route path='/' component={App}>
        <Route path='dashboard' component={Dashboard} />
        <Route path='users' component={Users} />
        <Route path='users/:id' component={UserProfile} />
      </Route>
  )
}

export default routes
