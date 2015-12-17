import React from 'react'
import {render} from 'react-dom'
import Router from 'react-router'
import routes from '../routes'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import DataWrapper from '../containers/DataWrapper'

//https://github.com/rackt/react-router/issues/1969

window.debug = require('debug')

const HISTORY = createBrowserHistory()

const DEBUG = window.debug('subsidium')

const INITIAL_STATE = window.__INITIAL_STATE__ || {
  users : [],
  tasks : []
}

const ROOT_ELEM = document.getElementById('content')

render(
  <DataWrapper data={ INITIAL_STATE  }><Router history={ HISTORY }>{ routes }</Router></DataWrapper>,
  ROOT_ELEM
)
