import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import App from './App'


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
      </div>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
