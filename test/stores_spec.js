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
          _id : 0
        },
        {
          username : 'Bob',
          _id : 1
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


      it('it sets store state for GET_USERS', () => {

        let store = configureStore({}, reduxReactRouter, createHistory)

        store.dispatch({
          type: types.GET_USERS,
          data: usersArray
        })

        assert.deepEqual(store.getState().users, usersArray)

      })


      it('it sets store state for CREATE_USER', () => {

        let store = configureStore({}, reduxReactRouter, createHistory)

        store.dispatch({
          type: types.CREATE_USER,
          data: {
            _id : 3,
            username : 'Fanny'
          }
        })

        assert.deepEqual(store.getState().users, [{
          _id : 3,
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
            _id : 0
          },
          {
            username : 'Nobby',
            _id : 1
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
          _id : 1,
          username : 'Bob'
        }])

      })

  })
})
