// if (process.env.BROWSER) {
//   require('../styles/App.scss')
// }


import React, { Component } from 'react'
import { ReduxRouter } from 'redux-router'
import routes from '../routes/'

class App extends Component {
  render() {
    return (
      <ReduxRouter>
        { routes }
      </ReduxRouter>
    )
  }
}

export default App

// class App extends Component {
//
//   static propTypes = {
//     children: PropTypes.object
//   }
//
//
//   render() {
//     return  (<section className="App">
//             <header>
//               <h1>subsidium</h1>
//             </header>
//             <main>
//               {this.props.children}
//             </main>
//     </section>
//   )
// }
// }
// export default App
