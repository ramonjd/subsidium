//https://github.com/jchapron/redux-friendlist-demo/blob/v1.0/src/containers/FriendListApp.js
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


@connect(state => ({
  users: state.users
}))
export default class Users extends Component {

  // static propTypes = {
  //   dispatch: PropTypes.func.isRequired
  // }

  render () {
    //const { users: [], dispatch } = this.props
    // const actions = bindActionCreators(FriendsActions, dispatch)

  //   <div className={styles.friendListApp}>
  //     <h1>The FriendList</h1>
  //     <AddFriendInput addFriend={actions.addFriend} />
  //     <FriendList friends={friendsById} actions={actions} />
  //   </div>
  //   <section className="Users"><h2>Users</h2>
  //   <UserProfile users={users} {...bindActionCreators(UserActions, dispatch)}/>
  //  </section>


    return (

      <section className="Users"><h2>Users</h2>
     </section>
    )
  }
}
