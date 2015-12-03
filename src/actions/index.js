
import request from 'axios'
import {urls} from '../constants/'


// ACTIONS FOR WAITING AND SUCCESS
// https://github.com/rackt/redux/issues/99
// see here for example
// https://github.com/rackt/redux/blob/master/docs/recipes/WritingTests.md

function setUsers(data) {
  return {
    type: 'SET_USERS',
    data
  }
}

function createUser(data) {
  return {
    type: 'CREATE_USER',
    data
  }
}
function editUser(id, data) {
  return {
    type: 'EDIT_USER',
    id,
    data
  }
}
function deleteUser(id) {
  return {
    type: 'DELETE_USER',
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
  return dispatch => {
    return request
      .post(urls.USERS_API_URL, data)
      .then(res => dispatch(setUsers(res.data)))
      .catch(err => dispatch(error(err)))
  }
}

export function editUser(id) {
  return dispatch => {
    return request
      .put(urls.USERS_API_URL, {id : id})
      .then(res => dispatch(setUsers(res.data)))
      .catch(err => dispatch(error(err)))
  }
}

export function deleteUser() {
  return dispatch => {
    return request
      .delete(urls.USERS_API_URL, {id : id})
      .then(res => dispatch(setUsers(res.data)))
      .catch(err => dispatch(error(err)))
  }
}
