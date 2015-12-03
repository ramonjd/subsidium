import {expect, assert} from 'chai'
import Immutable from 'seamless-immutable'
import {users as userReducer} from '../src/reducers/'
import {types} from '../src/constants/'



describe('reducers', () => {

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

    it('sets users array to the state for SET_USERS', () => {
      const state = Immutable([])

      let nextState = userReducer(state, {
        type : types.SET_USERS,
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
            id : 2
          }
        })

        assert.isTrue( Immutable.isImmutable(nextState))
        assert.deepEqual(nextState, [
          {
            username : 'Fred',
            id : 0
          },
          {
            username : 'Bob',
            id : 1
          },
          {
            username : 'Slob',
            id : 2
          }
        ])
     })


     it('edit user in users for EDIT_USERS', () => {

       const state = Immutable(usersArray)

       let nextState = userReducer(state, {
         type : types.EDIT_USER,
         id : 1,
         data : {
           username : 'Slobbr'
         }
       })

       assert.isTrue( Immutable.isImmutable(nextState))
       assert.deepEqual(nextState, [
         {
           username : 'Fred',
           id : 0
         },
         {
           username : 'Slobbr',
           id : 1
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
           id : 1
         }
       ])
     })
  })

})
