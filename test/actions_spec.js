//  https://github.com/rackt/redux/blob/master/docs/recipes/WritingTests.md
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { expect, assert } from 'chai'
import {userActions} from '../src/actions/'
import { types, urls } from '../src/constants/'
import nock from 'nock'

const middlewares = [ thunk ]

/**
 * Creates a mock of Redux store with middleware.
 */
function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.')
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.')
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift()

        try {
          expect(action).to.deep.equal(expectedAction)
          if (done && !expectedActions.length) {
            done()
          }
          return action
        } catch (e) {
          done(e)
        }
      }
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware)

  return mockStoreWithMiddleware()
}



describe('actions', () => {

let expectedActions
let store

describe('users', () => {

  afterEach(() => {
    nock.cleanAll()
  })



  it('creates GET_USERS after gettings users', (done) => {

    let usersArray =  [
      {
        username : 'Fred',
        id : 0
      },
      {
        username : 'Bob',
        id : 1
      }
    ]
    nock('http://localhost:8888')
      .get('/api/users')
      .reply(200, usersArray)

    expectedActions = [
      { type: 'GET_USERS', data: usersArray }
    ]
    store = mockStore({ users: [] }, expectedActions, done)
    store.dispatch(userActions.getUsers())

    })


    it('creates CREATE_USER after creating users', (done) => {

      let newUser =  {
        username : 'N00b',
        id : 0
      }

      nock('http://localhost:8888')
        .post('/api/users', newUser)
        .reply(201, newUser)

      expectedActions = [
        { type: 'CREATE_USER', data: newUser }
      ]
      store = mockStore({ users: [] }, expectedActions, done)

      store.dispatch(userActions.createUser(newUser))

      })


      it('creates EDIT_USER after editing a user', (done) => {

        let updatedUser =  {
          username : 'N00berlicious',
          id : 0
        }

        nock('http://localhost:8888')
          .put('/api/users', {id : 0, data : updatedUser})
          .reply(200, updatedUser)

        expectedActions = [
          { type: 'UPDATE_USER', id : 0, data : updatedUser }
        ]
        store = mockStore({ users: [] }, expectedActions, done)

        store.dispatch(userActions.updateUser(0, updatedUser))

      })

        it('creates DELETE_USER after deleting a user', (done) => {


          nock('http://localhost:8888')
            .delete('/api/users/0')
            .reply(200)

          expectedActions = [
            {
              type: 'DELETE_USER',
              id : 0
            }
          ]
          store = mockStore({ users: [] }, expectedActions, done)

          store.dispatch(userActions.deleteUser(0))

        })
  })
})
