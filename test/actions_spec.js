//  https://github.com/rackt/redux/blob/master/docs/recipes/WritingTests.md
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { expect, assert } from 'chai'
import * as actions from '../src/actions/'
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
          expect(action).to.equal(expectedAction)
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

describe('async actions', () => {

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


  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', (done) => {

    nock('http://localhost:3000')
      .get(urls.USERS_API_URL)
      .reply(200, usersArray)

    const expectedActions = [
      { type: types.SET_USERS, data: usersArray }
    ]
    const store = mockStore({ users: [] }, expectedActions, done)
    store.dispatch(actions.fetchUsers())
    
  })
})
