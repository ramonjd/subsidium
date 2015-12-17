/* eslint no-console: 0 */
import config from '../config/'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import mongoose from 'mongoose'
import api from './api/'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { RoutingContext, match } from 'react-router'
import routes from './routes'
import createLocation from 'history/lib/createLocation'
import createMemoryHistory from 'history/lib/createMemoryHistory'

// do this in routes
import DataWrapper from './containers/DataWrapper'

// import React from 'react'
// import routes from '../routes/'
//import mongoose from 'mongoose'
// import { renderToString } from 'react-dom/server'
// import { RoutingContext, match } from 'react-router'
// import createLocation from 'history/lib/createLocation'
// import { Provider } from 'react-redux'
// import * as reducers from '../reducers/'
// import { createStore,
//          combineReducers,
//          applyMiddleware } from 'redux'


// Initialize express server
export default function(callback) {
  const server = express()

  mongoose.connect(config.database)
  mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
  })

  server.set('env', process.env.NODE_ENV || 'development')
  server.set('host', process.env.HOST || 'localhost')
  server.set('port', process.env.PORT || 8888)
  server.set('views', './src/views')
  server.set('view engine', 'jade')
  server.use(morgan(server.get('env') === 'production' ? 'combined' : 'dev'))
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(compression())

  api(server)
  server.get('/*', (req, res) => {


    const location = createLocation(req.url)
    const history = createMemoryHistory()

    match({ routes, location, history }, (err, redirectLocation, renderProps) => {


      if(err) {
        console.error(err)
        //return res.status(500).end('Internal server error')
      }
      if (redirectLocation) {
        //res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      }
      if (!renderProps) {
        //return res.status(404).end('Not found')
      }

      if (renderProps) {
        //renderProps.history = history



        function renderView(res) {
          console.log(res.data)
          const InitialView = (
            <DataWrapper data={ res.data }><RoutingContext {...renderProps} /></DataWrapper>
          )
          const componentHTML = renderToString(InitialView)
          const initialState = {
            users : res.data,
            tasks : []
          }
          return { content: componentHTML, initialState : JSON.stringify(initialState) }
        }

        // do this based on route (create function for this)
        console.log(renderProps.components[1])

        renderProps.components[1].getState()
        .then(renderView)
        .then(viewObject => res.status(200).render('index',  viewObject))
        .catch(err => res.end(err.message))

      }

    })


  })



/*  server.use((req, res) => {
    const location = createLocation(req.url)

    match({ routes, location }, (err, redirectLocation, renderProps) => {


      console.log('renderProps', renderProps)
      console.log('redirectLocation', redirectLocation)


      if(err) {
        console.error(err)
        return res.status(500).end('Internal server error')
      }
      if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      }
      if (!renderProps) {
        return res.status(404).end('Not found')
      }





      function renderView() {
        const InitialView = (
          <Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>
        )
        const componentHTML = renderToString(InitialView)
        const initialState = store.getState()
        return { content: componentHTML, initialState : JSON.stringify(initialState) }
      }


      fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(renderView)
        .then(viewObject => res.status(200).render('index',  viewObject))
        .catch(err => res.end(err.message))
      })

      })
    })*/

  // Generic server errors (e.g. not caught by components)
  server.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
    console.log('Error on request %s %s', req.method, req.url)
    console.log(err)
    console.log(err.stack)
    res.status(500).send('This is not good')
  })

  // Finally, start the express server
  return server.listen(server.get('port'), () => callback(server))

}
