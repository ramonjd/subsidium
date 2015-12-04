import React from 'react';
import { render }           from 'react-dom';
import { Router }           from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider }         from 'react-redux';
import { fromJS }           from 'immutable';
import * as reducers        from '../reducers/';
import routes               from '../routes/';
import promiseMiddleware    from '../utils/promiseMiddleware';
import immutifyState        from '../utils/immutifyState';
import { createStore,
         combineReducers,
         applyMiddleware }  from 'redux';

window.debug = require('debug');
const debug = window.debug('shorteststraw');
const initialState = immutifyState(window.__INITIAL_STATE__);
const history = createBrowserHistory();
const reducer = combineReducers(reducers);
const store   = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('main')

);
