import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import Users from './containers/Users'
import UserProfile from './containers/UserProfile'
import Tasks from './containers/Tasks'

const HISTORY = (typeof(window) !== 'undefined') ? createBrowserHistory() : createMemoryHistory()


// https://ponyfoo.com/articles/universal-routing-react-es6
// https://github.com/rackt/react-router/blob/latest/docs/Introduction.md

let routes = (
    <Router history={ HISTORY }>
        <Redirect from='/' to='dashboard' />
        <Route path='/' component={App}>
          <Route path='dashboard' component={Dashboard} />
          <Route path='users' component={Users} />
          <Route path='users/:id' component={UserProfile} />
        </Route>
    </Router>
)

export default routes
