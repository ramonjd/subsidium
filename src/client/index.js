import React from 'react'
import {render} from 'react-dom'
import Router from 'react-router'
import routes from '../routes'

window.debug = require('debug')

const DEBUG = window.debug('subsidium')

const INITIAL_STATE = window.__INITIAL_STATE__ || {
  users : [],
  tasks : []
}

const ROOT_ELEM = document.getElementById('content')

render(
  routes,  ROOT_ELEM
)
