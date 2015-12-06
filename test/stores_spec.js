import {expect, assert} from 'chai'
import Immutable from 'seamless-immutable'
import configureStore from '../src/stores/'
import {types} from '../src/constants/'
import { reduxReactRouter } from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'

describe('store', () => {

  describe('users', () => {
      const usersArray =  [
        {
          username : 'Fred',
          id : 0
        },
        {
          username : 'Bob',
          id : 1
        }
      ]

      it('is a Redux store configured with the correct reducers', () => {

        let store = configureStore({
          users : []
        }, reduxReactRouter, createHistory)

        assert.deepEqual(store.getState().users, [])

      })


      it('it sets an intial state', () => {

        let store = configureStore({users : 'dsd'}, reduxReactRouter, createHistory)

        assert.deepEqual(store.getState().users, 'dsd')

      })


      it('it sets store state for SET_USERS', () => {

        let store = configureStore({}, reduxReactRouter, createHistory)

        store.dispatch({
          type: types.SET_USERS,
          data: usersArray
        })

        assert.deepEqual(store.getState().users, usersArray)

      })


      it('it sets store state for CREATE_USER', () => {

        let store = configureStore({}, reduxReactRouter, createHistory)

        store.dispatch({
          type: types.CREATE_USER,
          data: {
            id : 3,
            username : 'Fanny'
          }
        })

        assert.deepEqual(store.getState().users, [{
          id : 3,
          username : 'Fanny'
        }])

      })

      it('it sets store state for EDIT_USER', () => {

        let store = configureStore({
          users : usersArray
        }, reduxReactRouter, createHistory)

        store.dispatch({
          type: types.UPDATE_USER,
          id: 1,
          data : {
            username : 'Nobby'
          }
        })

        assert.deepEqual(store.getState().users, [
          {
            username : 'Fred',
            id : 0
          },
          {
            username : 'Nobby',
            id : 1
          }
        ])

      })

      it('it sets store state for DELETE_USER', () => {

        let store = configureStore({
          users : usersArray
        }, reduxReactRouter, createHistory)

        store.dispatch({
          type: types.DELETE_USER,
          id: 0
        })

        assert.deepEqual(store.getState().users, [{
          id : 1,
          username : 'Bob'
        }])
        
      })

  })
})
