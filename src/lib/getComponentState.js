
import { renderToString } from 'react-dom/server'
import { buildRouter } from '../routes'


let applicationState = {
    users : [],
    tasks : []
}

function renderView(res, renderProps, applicationStateKey) {
  applicationState[applicationStateKey] = res.data
  const componentHTML = renderToString(buildRouter(applicationState, renderProps))
  return { content: componentHTML, initialState : JSON.stringify(applicationState) }
}


export default function renderComponentState(renderProps) {

  let getStateMethod
  let applicationStateKey

  if (renderProps.location && renderProps.routes) {
    renderProps.routes.some((route, index) => {
      if (route.path === renderProps.location.pathname && route.component.getState) {
        console.log('route.component.getState', route.component.getState)
        applicationStateKey = route.component.name.toLowerCase()
        getStateMethod = route.component.getState
        return true
      } else {
        return false
      }
    })
  }

  return getStateMethod().then((res) => {
    return renderView(res, renderProps, applicationStateKey)
  })

  //return getStateMethod
}
