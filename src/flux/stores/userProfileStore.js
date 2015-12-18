/* jshint browser: true */
import AppDispatcher from '../dispatcher/AppDispatcher'
import {urls, types} from '../../constants/'
import {EventEmitter} from 'events'
import Immutable from 'seamless-immutable'
import request from 'axios'

let USER = Immutable({})

class UserProfileStore extends EventEmitter {
    constructor(){
        super()
    }

    getState(){
        return USER
    }

    setState(data){
        USER = Immutable(data)
    }

    getUserById(id) {
      return request
        .get(urls.USERS_API_URL + '/' + id)
    }

    updateUser(userId, data) {
      console.log('Store updateUser()')
      return request
        .put(urls.USERS_API_URL, {id : userId, data : data})
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

    addErrorListener(callback){
        this.on(types.ERROR_EVENT, callback)
    }

    removeErrorListener(callback) {
        this.removeListener(types.ERROR_EVENT, callback)
    }
}


const userProfileStore = new UserProfileStore()

userProfileStore.dispatchToken = AppDispatcher.register((action) => {

    console.log('AppDispatcher register in store', action)

    switch(action.type) {

      case types.GET_USER_BY_ID:
        userProfileStore.getUserById(action.id)
          .then(res => userProfileStore.emitChange(types.CHANGE_EVENT, Immutable(res.data)))
          .catch(err => userProfileStore.emitChange(types.ERROR_EVENT, err))
        break

      case types.UPDATE_USER:
        userProfileStore.updateUser(action.id, action.data)
          .then(res => userProfileStore.emitChange(types.CHANGE_EVENT, Immutable(res.data)))
          .catch(err => userProfileStore.emitChange(types.ERROR_EVENT, err))
        break


      default:
        break
    }
})

export default userProfileStore
