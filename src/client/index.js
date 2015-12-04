import React from 'react'
import { render }           from 'react-dom'
import { Router }           from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider }         from 'react-redux'
import * as reducers        from '../reducers/'
import routes               from '../routes/'
import Immutable from 'seamless-immutable'
import makeStore from '../stores/'

window.debug = require('debug')
const debug = window.debug('subsidium')
//const initialState = immutifyState(window.__INITIAL_STATE__)
const history = createBrowserHistory()


//const store   = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState)
const store   = makeStore()

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('content')

)
