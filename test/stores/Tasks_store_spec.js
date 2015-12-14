import {expect, assert} from 'chai'
import Immutable from 'seamless-immutable'
import configureStore from '../../src/stores/'
import {types} from '../../src/constants/'
import { reduxReactRouter } from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'

describe('store', () => {

  describe('tasks', () => {
      const tasksArray =  [
        {
          name : 'eat',
          description : 'a tart',
          type : 1,
          _id : 0
        },
        {
          name : 'fart',
          description : 'a sheep',
          type : -1,
          _id : 1
        }
      ]

      it('is a Redux store configured with the correct reducers', () => {

        let store = configureStore({
          tasks : []
        }, reduxReactRouter, createHistory)

        assert.deepEqual(store.getState().tasks, [])

      })


      it('it sets an intial state', () => {

        let store = configureStore({tasks : [1,2,4]}, reduxReactRouter, createHistory)

        assert.deepEqual(store.getState().tasks, [1,2,4])

      })


      it('it sets store state for GET_TASKS', () => {

        let store = configureStore({
          tasks : []
        }, reduxReactRouter, createHistory)

        store.dispatch({
          type: types.GET_TASKS,
          data: tasksArray
        })

        assert.deepEqual(store.getState().tasks, tasksArray)

      })


      it('it sets store state for CREATE_TASK', () => {

        let store = configureStore({
          tasks : []
        }, reduxReactRouter, createHistory)

        store.dispatch({
          type: types.CREATE_TASK,
          data: {
            name : 'perry',
            description : 'mason',
            type : 1,
            _id : 3
          }
        })

        assert.deepEqual(store.getState().tasks, [{
          name : 'perry',
          description : 'mason',
          type : 1,
          _id : 3
        }])

      })

      it('it sets store state for EDIT_TASK', () => {

        let store = configureStore({
          tasks : tasksArray
        }, reduxReactRouter, createHistory)

        store.dispatch({
          type: types.UPDATE_TASK,
          id: 1,
          data : {
            name : 'headache',
            description : 'person'
          }
        })

        assert.deepEqual(store.getState().tasks, [
          {
            name : 'eat',
            description : 'a tart',
            type : 1,
            _id : 0
          },
          {
            name : 'headache',
            description : 'person',
            type : -1,
            _id : 1
          }
        ])

      })

      it('it sets store state for DELETE_TASK', () => {

        let store = configureStore({
          tasks : tasksArray
        }, reduxReactRouter, createHistory)

        store.dispatch({
          type: types.DELETE_TASK,
          id: 0
        })

        assert.deepEqual(store.getState().tasks, [{
          name : 'fart',
          description : 'a sheep',
          type : -1,
          _id : 1
        }])

      })

  })
})
