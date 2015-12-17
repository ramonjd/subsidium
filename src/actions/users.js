
import request from 'axios'
import {urls, types} from '../constants/'


// ACTIONS FOR WAITING AND SUCCESS
// https://github.com/rackt/redux/issues/99
// see here for example
// https://github.com/rackt/redux/blob/master/docs/recipes/WritingTests.md
// https://github.com/rackt/redux/issues/432

function fetchUsers(data) {
  return {
    type: types.GET_USERS,
    data
  }
}

function fetchUserById(data) {
  return {
    type: types.GET_USER_BY_ID,
    data
  }
}

function makeUser(data) {
  return {
    type: types.CREATE_USER,
    data
  }
}
function removeUserById(id) {
  return {
    type: types.DELETE_USER,
    id
  }
}
function editUser(data) {
  return {
    type: types.UPDATE_USER,
    data
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
      .then(res => dispatch(fetchUsers(res.data)))
      .catch(err => dispatch(error(err)))
  }
}


export function getUserById(id) {
  return dispatch => {
    return request
      .get(urls.USERS_API_URL + '/' + id)
      .then(res => dispatch(fetchUserById(res.data)))
      .catch(err => dispatch(error(err)))
  }
}

export function createUser(data) {
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
      .then(res => dispatch(editUser(res.data)))
      .catch(err => dispatch(error(err)))
  }
}

export function deleteUser(id) {
  return dispatch => {
    return request
      .delete(urls.USERS_API_URL + '/' + id)
      .then(res => dispatch(removeUserById(id)))
      .catch(err => dispatch(error(err)))
  }
}
