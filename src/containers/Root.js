import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'


class Root extends Component {
  constructor(dev) {
    super()
  }
  render() {
    return (
        <div>
          <Provider store={this.props.store}>
            <App />
          </Provider>
          <DebugPanel top right bottom>
            <DevTools store={this.props.store} monitor={LogMonitor} />
          </DebugPanel>
        </div>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
