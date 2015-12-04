import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Users from '../containers/Users';
// <IndexRoute component={Dashboard} />

export default (
  <Route path='/' component={App}>
    <Route path='/users' component={Users}/>
  </Route>
);
