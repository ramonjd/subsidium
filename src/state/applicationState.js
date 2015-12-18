
import { renderToString } from 'react-dom/server'
import { buildRouter } from '../routes'
import stores from '../flux/stores/'

function getApplicationState(){
  let state = {}
  for (var key in stores) {
    state[key] = stores[key].getState()
  }
  return state
}

function setApplicationState(applicationStateKey, componentPropTypes, responseData) {
  if (componentPropTypes[applicationStateKey]) {
    stores[applicationStateKey].setState(responseData)
  }
}

function renderView(responseData, renderProps, componentPropTypes, applicationStateKey) {
  setApplicationState(applicationStateKey, componentPropTypes, responseData)
  let initialState = getApplicationState()
  let componentHTML = renderToString(buildRouter(initialState, renderProps))
  return { content: componentHTML, initialState : JSON.stringify(initialState) }
}

export function renderComponentState(reqParams = {}, renderProps) {
  let currentRoute = renderProps.routes[renderProps.routes.length -1]
  return currentRoute.component.getState(reqParams).then((res) => {
    return renderView(res.data, renderProps, currentRoute.component.propTypes, currentRoute.component.name.toLowerCase())
  })
}
