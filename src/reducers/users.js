
// https://github.com/rackt/redux/blob/master/examples/async/reducers/index.js

import {List, Map, fromJS} from 'immutable'
import Immutable from 'seamless-immutable'

const initialState = Immutable([])

export default function userReducer(currentState = initialState, action = {}) {


  switch(action.type) {
    case 'SET_USERS':
      return Immutable([]).concat(Immutable(action.data))
    case 'CREATE_USER':
      return Immutable(currentState).concat([action.data])
    case 'EDIT_USER':
      return Immutable(currentState).map(function(obj, index) {
        if (index === action.id) {
          let mutableObject = obj.asMutable()
          for (let key in mutableObject) {
            if (mutableObject[key] && action.data[key]) {
              mutableObject[key] = action.data[key]
            }
          }
          return Immutable(mutableObject)
        } else {
          return obj
        }
      })
    case 'DELETE_USER':
        return Immutable(currentState).filter((obj) => {
          return obj.id !== action.id
        })
    default:
      return currentState
  }
}
