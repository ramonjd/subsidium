import {expect, assert} from 'chai'
import Immutable from 'seamless-immutable'
import userReducer from '../src/reducers/users'
import {types} from '../src/constants/'


describe('reducers', () => {

  describe('users', () => {

    const usersArray =  [
      {
        name : 'Fred',
        _id : 0
      },
      {
        name : 'Bob',
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


    it('add user to users to the state for CREATE_USER', () => {
        const state = Immutable(usersArray)

        let nextState = userReducer(state, {
          type : types.CREATE_USER,
          data : {
            name : 'Slob',
            _id : 2
          }
        })

        assert.isTrue( Immutable.isImmutable(nextState))
        assert.deepEqual(nextState, [
          {
            name : 'Slob',
            _id : 2
          },
          {
            name : 'Fred',
            _id : 0
          },
          {
            name : 'Bob',
            _id : 1
          }
        ])
     })


     it('edit user in users for UPDATE_USER', () => {

       const state = Immutable(usersArray)

       let nextState = userReducer(state, {
         type : types.UPDATE_USER,
         id : 1,
         data : {
           name : 'Slobbr'
         }
       })

       assert.isTrue( Immutable.isImmutable(nextState))
       assert.deepEqual(nextState, [
         {
           name : 'Fred',
           _id : 0
         },
         {
           name : 'Slobbr',
           _id : 1
         }
       ])
     })

     it('delete user in users for DELETE_USER', () => {

       const state = Immutable(usersArray)

       let nextState = userReducer(state, {
         type : types.DELETE_USER,
         id : 0
       })
       assert.isTrue(Immutable.isImmutable(nextState))
       assert.deepEqual(nextState, [
         {
           _id : 1,
           name : 'Bob'
         }
       ])
     })
  })

})
