import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Dashboard from '../containers/Dashboard';
import Users from '../containers/Users';
// <IndexRoute component={Dashboard} />

export default (
  <Route path='/' component={Dashboard}>
    <Route path='users' component={Users}/>
  </Route>
)
