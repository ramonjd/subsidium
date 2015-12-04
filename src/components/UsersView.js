//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'



export default class UsersView extends Component {

  static propTypes = {
     users:  PropTypes.arrayOf(PropTypes.shape({
       username: PropTypes.string.isRequired,
    })).isRequired,
    actions : PropTypes.objectOf(React.PropTypes.func)
   }

  render () {


    const { users, actions } = this.props;
    console.log('UsersView', this.props);
    let usersList = users.map((user, i) => {
        return <li key={ i }>{ user.username }</li>
      })


    return (

      <ul className="UsersView">
      { usersList }
     </ul>
    )
  }
}
