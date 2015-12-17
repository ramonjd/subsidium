
// https://github.com/rackt/redux/blob/master/examples/async/reducers/index.js
// http://rackt.org/redux/docs/basics/Reducers.html
// https://github.com/rtfeldman/seamless-immutable
import Immutable from 'seamless-immutable'
import {types} from '../constants/'

const initialState = Immutable([])

export default function users(currentState = initialState, action = {}) {

  switch(action.type) {

    case types.GET_USERS:
      return Immutable(action.data.sort(function(a, b){
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        if(a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        return 0
      }))

    case types.CREATE_USER:
      return Immutable([action.data].concat(currentState).sort(function(a, b){
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        if(a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        return 0
      }))

    case types.GET_USER_BY_ID:
      return Immutable([action.data])

    case types.UPDATE_USER:
      return Immutable([action.data])

    case types.DELETE_USER:
      return Immutable(currentState.filter((obj) => {
        return action.id !== obj._id
      }))

    default:
      return currentState
  }
}
