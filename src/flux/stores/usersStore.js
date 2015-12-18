/* jshint browser: true */
import AppDispatcher from '../dispatcher/AppDispatcher'
import {urls, types} from '../../constants/'
import {EventEmitter} from 'events'
import Immutable from 'seamless-immutable'
import request from 'axios'
import usersReducer from '../reducers/usersReducer'

let USERS = usersReducer()

class UserStore extends EventEmitter {
    constructor(){
        super()
    }

    getState(){
        return USERS
    }

    setState(data){
        USERS = usersReducer(data)
    }

    getUsers() {
      console.log('Store getUsers()')
      return request
        .get(urls.USERS_API_URL)
    }

    createUser(data) {
      console.log('Store createUser()')
      return request
        .post(urls.USERS_API_URL, data)
    }
    deleteUser(id) {
      console.log('Store deleteUser()')
      return request
        .delete(urls.USERS_API_URL + '/' + id)
    }

    emitChange(event, data = {}){
      this.setState(data)
      this.emit(event, data)
    }

    addChangeListener(callback){
        this.on(types.CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(types.CHANGE_EVENT, callback)
    }
    addDeleteListener(callback){
        this.on(types.USER_DELETED_EVENT, callback)
    }

    removeDeleteListener(callback) {
        this.removeListener(types.USER_DELETED_EVENT, callback)
    }
    addErrorListener(callback){
        this.on(types.ERROR_EVENT, callback)
    }

    removeErrorListener(callback) {
        this.removeListener(types.ERROR_EVENT, callback)
    }
}


const usersStore = new UserStore()

usersStore.dispatchToken = AppDispatcher.register((action) => {

    console.log('AppDispatcher register in store', action)

    switch(action.type) {

      case types.GET_USERS:
        usersStore.getUsers()
          .then(res => usersStore.emitChange(types.CHANGE_EVENT, usersReducer(usersStore.getState(), {
            type : types.GET_USERS,
            data : res.data
            })))
          .catch(err => usersStore.emitChange(types.ERROR_EVENT, err))
        break

      case types.CREATE_USER:
        usersStore.createUser(action.data)
          .then(res => usersStore.emitChange(types.CHANGE_EVENT, usersReducer(usersStore.getState(), {
            type : types.CREATE_USER,
            data : res.data
            })))
          .catch(err => usersStore.emitChange(types.ERROR_EVENT, err))
        break

        case types.DELETE_USER:
          usersStore.deleteUser(action.id)
          .then(res => usersStore.emitChange(types.USER_DELETED_EVENT, usersReducer(usersStore.getState(), {
            type : types.DELETE_USER,
            data : res.data
            })))
          .catch(err => usersStore.emitChange(types.ERROR_EVENT, err))
          break

      default:
        break
    }
})

export default usersStore
