import AppDispatcher from '../dispatcher/AppDispatcher'
import {types} from '../../constants/'

const usersActions = {

  getUsers : () => {
    AppDispatcher.dispatch({
      type: types.GET_USERS
    })
  },

  getUserById : (id) => {
    AppDispatcher.dispatch({
      type: types.GET_USER_BY_ID,
      id
    })
  },

  createUser : (data) => {
    AppDispatcher.dispatch({
      type: types.CREATE_USER,
      data
    })
  },

  updateUser : (id, data) => {
    AppDispatcher.dispatch({
      type: types.UPDATE_USER,
      id,
      data
    })
  },

  deleteUser : (id) => {
    AppDispatcher.dispatch({
      type: types.DELETE_USER,
      id
    })
  }
}

export default usersActions
