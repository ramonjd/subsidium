
import request from 'axios'
import {urls, types} from '../constants/'


// ACTIONS FOR WAITING AND SUCCESS
// https://github.com/rackt/redux/issues/99
// see here for example
// https://github.com/rackt/redux/blob/master/docs/recipes/WritingTests.md

function setUsers(data) {
  return {
    type: types.SET_USERS,
    data
  }
}

function makeUser(data) {

  return {
    type: types.CREATE_USER,
    data
  }
}
function editUser(id, data) {
  return {
    type: types.UPDATE_USER,
    id,
    data
  }
}
function removeUser(id) {
  return {
    type: types.DELETE_USER,
    id
  }
}
function error(data) {
  return {
    type: 'ERROR',
    data
  }
}

export function getUsers() {
  return dispatch => {
    return request
      .get(urls.USERS_API_URL)
      .then(res => dispatch(setUsers(res.data)))
      .catch(err => dispatch(error(err)))
  }
}

export function createUser(data) {
  console.log('createUser', data)
  return dispatch => {
    return request
      .post(urls.USERS_API_URL, data)
      .then(res => dispatch(makeUser(res.data)))
      .catch(err => dispatch(error(err)))
  }
}

export function updateUser(userId, data) {
  return dispatch => {
    return request
      .put(urls.USERS_API_URL, {id : userId, data : data})
      .then(res => dispatch(editUser(userId, res.data)))
      .catch(err => dispatch(error(err)))
  }
}

export function deleteUser(userId) {
  return dispatch => {
    return request
      .delete(urls.USERS_API_URL + '/' + userId)
      .then(res => dispatch(removeUser(userId)))
      .catch(err => dispatch(error(err)))
  }
}
