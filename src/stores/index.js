import { createStore, applyMiddleware, combineReducers } from 'redux'

import thunk from 'redux-thunk'

import * as reducers from '../reducers/'

// The data parameter that we see here is used to initialize our redux store with data. We didn't
// talk about this yet for simplicity but thanks to it your reducers can be initialized
// with real data if you already have some. For example in an isomorphic/universal app where you
// fetch data server-side, serialize and pass it to the client, your Redux store can be
// initialized with that data.
// We're not passing any data here but it's good to know about this createStore's ability.
export default function(initialState) {
  let reducer = combineReducers(reducers)
  let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
  let store = createStoreWithMiddleware(reducer, initialState)
  return store
}
