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
        USERS = data
    }

    getUsers() {
      console.log('Store getUsers()')
      return request
        .get(urls.USERS_API_URL)
        .then(res => this.emitChange(types.CHANGE_EVENT, usersReducer(this.getState(), {
          type : types.GET_USERS,
          data : res.data
          })))
        .catch(err => this.emitChange(types.ERROR_EVENT, err))
    }

    getUserById(id) {
      console.log('Store getUserById()')
      return request
        .get(urls.USERS_API_URL + '/' + id)
        .then(res => this.emitChange(types.CHANGE_EVENT, usersReducer(this.getState(), {
          type : types.GET_USER_BY_ID,
          data : res.data
          })))
        .catch(err => this.emitChange(types.ERROR_EVENT, err))
    }

    createUser(data) {
      console.log('Store createUser()')
      return request
        .post(urls.USERS_API_URL, data)
        .then(res => this.emitChange(types.CHANGE_EVENT, usersReducer(this.getState(), {
          type : types.CREATE_USER,
          data : res.data
          })))
        .catch(err => this.emitChange(types.ERROR_EVENT, err))
    }

    updateUser(userId, data) {
      console.log('Store updateUser()')
      return request
        .put(urls.USERS_API_URL, {id : userId, data : data})
        .then(res => this.emitChange(types.CHANGE_EVENT, usersReducer(this.getState(), {
          type : types.UPDATE_USER,
          data : res.data
          })))
        .catch(err => this.emitChange(types.ERROR_EVENT, err))
    }

    deleteUser(id) {
      return request
        .delete(urls.USERS_API_URL + '/' + id)
        .then(res => this.emitChange(types.USER_DELETED_EVENT, usersReducer(this.getState(), {
          type : types.DELETE_USER,
          data : res.data
          })))
        .catch(err => this.emitChange(types.ERROR_EVENT, err))
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
        break

      case types.CREATE_USER:
        usersStore.createUser(action.data)
        break

      case types.GET_USER_BY_ID:
        usersStore.getUserById(action.id)
        break

      case types.UPDATE_USER:
        usersStore.updateUser(action.id, action.data)
        break

      case types.DELETE_USER:
        usersStore.deleteUser(action.id)
        break

      default:
        break
    }
})

export default usersStore
