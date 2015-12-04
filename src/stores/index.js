// https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/store/configureStore.js

import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'

import rootReducer from '../reducers/'

import routes from '../routes/'

export default function configureStore(initialState, reduxReactRouter, createHistory) {
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    reduxReactRouter({
      routes,
      createHistory
    })
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/', () => {
      const nextRootReducer = require('../reducers/')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

// export default function(initialState, reduxReactRouter, createHistory) {
//   let reducer = combineReducers(reducers)
//   let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
//   let store = createStoreWithMiddleware(reducer, initialState)
//   return store
// }
