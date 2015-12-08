// https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/client.js
// import React from 'react'
// import { render }           from 'react-dom'
// import { Router }           from 'react-router'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
// import * as reducers        from '../reducers/'
// import routes               from '../routes/'





import React from 'react'
import {render} from 'react-dom'
import { reduxReactRouter } from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'
import configureStore from '../stores/'
import Root from '../containers/Root'

window.debug = require('debug')
const debug = window.debug('subsidium')
//const initialState = immutifyState(window.__INITIAL_STATE__)
const initialState = window.__INITIAL_STATE__ || {
  users : [],
  tasks : [],
  router : {}
}
const store = configureStore(initialState, reduxReactRouter, createHistory)

let rootElement = document.getElementById('content')

render(
  <Root store={ store } />, rootElement
)
