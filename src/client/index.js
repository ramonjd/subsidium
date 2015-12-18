import React from 'react'
import {render} from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { buildRouter } from '../routes'

//https://github.com/rackt/react-router/issues/1969

window.debug = require('debug')


const DEBUG = window.debug('subsidium')

const INITIAL_STATE = window.__INITIAL_STATE__ || {
  users : [],
  tasks : []
}

const PROPS = {
  history : createBrowserHistory()
}

const ROOT_ELEM = document.getElementById('content')

render(
  buildRouter(INITIAL_STATE, PROPS),
  ROOT_ELEM
)
