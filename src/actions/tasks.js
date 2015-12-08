
import request from 'axios'
import {urls, types} from '../constants/'


// ACTIONS FOR WAITING AND SUCCESS
// https://github.com/rackt/redux/issues/99
// see here for example
// https://github.com/rackt/redux/blob/master/docs/recipes/WritingTests.md
// https://github.com/rackt/redux/issues/432

function fetchTasks(data) {
  return {
    type: types.GET_TASKS,
    data
  }
}

function fetchTaskById(data) {
  return {
    type: types.GET_TASK_BY_ID,
    data
  }
}

function makeTask(state, data) {
  return {
    type: types.CREATE_TASK,
    state,
    data
  }
}
function editTask(id, data) {
  return {
    type: types.UPDATE_TASK,
    id,
    data
  }
}
function removeTask(id) {
  return {
    type: types.DELETE_TASK,
    id
  }
}
function error(data) {
  return {
    type: 'ERROR',
    data
  }
}

export function getTasks() {
  return dispatch => {
    return request
      .get(urls.TASKS_API_URL)
      .then(res => dispatch(fetchTasks(res.data)))
      .catch(err => dispatch(error(err)))
  }
}


export function getTaskById(id) {
  return dispatch => {
    return request
      .get(urls.TASKS_API_URL + '/' + id)
      .then(res => dispatch(fetchTaskById(res.data)))
      .catch(err => dispatch(error(err)))
  }
}

export function createTask(state, data) {
  return dispatch => {
    return request
      .post(urls.TASKS_API_URL, data)
      .then(res => dispatch(makeTask(state, res.data)))
      .catch(err => dispatch(error(err)))
  }
}

export function updateTask(id, data) {
  return dispatch => {
    return request
      .put(urls.TASKS_API_URL, {id : id, data : data})
      .then(res => dispatch(editTask(id, res.data)))
      .catch(err => dispatch(error(err)))
  }
}

export function deleteTask(id) {
  return dispatch => {
    return request
      .delete(urls.TASKS_API_URL + '/' + id)
      .then(res => dispatch(removeTask(id)))
      .catch(err => dispatch(error(err)))
  }
}
