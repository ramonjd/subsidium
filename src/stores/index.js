// https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/store/configureStore.js

import { createStore, applyMiddleware, compose } from 'redux'
import { devTools, persistState } from 'redux-devtools';
import thunk from 'redux-thunk'
import {* as reducers} from '../reducers/'
import routes from '../routes/'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

if (process.env.NODE_ENV === 'production') {
  // apply different middleware
}

export default function configureStore(initialState, createHistory) {


  const reducer = combineReducers(Object.assign({}, reducers, {
    routing: routeReducer
  }));

  const finalCreateStore = compose(
    devTools()
  )(createStore)


  const store = finalCreateStore(reducer)
  const history = createHistory()

  syncReduxAndRouter(history, store);




  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  syncReduxAndRouter(createHistory, store)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/', () => {
      const nextRootReducer = require('../reducers/')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
