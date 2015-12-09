import {expect, assert} from 'chai'
import Immutable from 'seamless-immutable'
import userReducer from '../src/reducers/users'
import {types} from '../src/constants/'


describe('reducers', () => {

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

    it('sets users array to the state for GET_USERS', () => {
      const state = Immutable([])

      let nextState = userReducer(state, {
        type : types.GET_USERS,
        data : usersArray
      })

      assert.isTrue( Immutable.isImmutable(nextState))
      assert.deepEqual(nextState, usersArray)

    })


    it('add user to users to the state for CREATE_USERS', () => {
        const state = Immutable(usersArray)

        let nextState = userReducer(state, {
          type : types.CREATE_USER,
          data : {
            username : 'Slob',
            _id : 2
          }
        })

        assert.isTrue( Immutable.isImmutable(nextState))
        assert.deepEqual(nextState, [
          {
            username : 'Fred',
            _id : 0
          },
          {
            username : 'Bob',
            _id : 1
          },
          {
            username : 'Slob',
            _id : 2
          }
        ])
     })


     it('edit user in users for UPDATE_USER', () => {

       const state = Immutable(usersArray)

       let nextState = userReducer(state, {
         type : types.UPDATE_USER,
         id : 1,
         data : {
           username : 'Slobbr'
         }
       })

       assert.isTrue( Immutable.isImmutable(nextState))
       assert.deepEqual(nextState, [
         {
           username : 'Fred',
           _id : 0
         },
         {
           username : 'Slobbr',
           _id : 1
         }
       ])
     })

     it('delete user in users for DELETE_USERS', () => {

       const state = Immutable(usersArray)

       let nextState = userReducer(state, {
         type : types.DELETE_USER,
         id : 0
       })
       assert.isTrue( Immutable.isImmutable(nextState))
       assert.deepEqual(nextState, [
         {
           username : 'Bob',
           _id : 1
         }
       ])
     })
  })

})
