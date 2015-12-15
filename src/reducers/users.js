
// https://github.com/rackt/redux/blob/master/examples/async/reducers/index.js
// http://rackt.org/redux/docs/basics/Reducers.html
// https://github.com/rtfeldman/seamless-immutable
import Immutable from 'seamless-immutable'
import {types} from '../constants/'

const initialState = Immutable([])

export default function users(currentState = initialState, action = {}) {

  switch(action.type) {

    case types.GET_USERS:
      return Immutable(action.data)

    case types.CREATE_USER:
      return Immutable([action.data].concat(currentState).sort())

    case types.UPDATE_USER:
      return Immutable(currentState).map((obj, index) =>{
        if (obj._id === action.id) {
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

    case types.DELETE_USER:
      return Immutable(currentState.filter((obj) => {
        return action.id !== obj._id
      }))

    default:
      return currentState
  }
}
