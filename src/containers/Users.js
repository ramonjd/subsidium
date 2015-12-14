//https://github.com/KyperTech/webpack-redux-react-starter/blob/master/app/components/Main.js
// http://notjoshmiller.com/ajax-polling-in-react-with-redux/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {userActions} from '../actions/'
import ItemListView from '../components/ItemListView'
import UserCreateEdit from '../components/UserCreateEdit'
import Button from '../components/Button'

// function mapStateToProps(state) {
//   console.log('statesss', state)
//   return { users: state.users }
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(userActions, dispatch)
// }
//
//
// @connect(mapStateToProps, mapDispatchToProps)

let getState = () => {
    return {
        currentUserId : '',
        showUserCreate : false,
        mode : 'create'
    };
};

class Users extends Component {

  static propTypes = {
    users:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
    actions : PropTypes.objectOf(React.PropTypes.func).isRequired
   }


  constructor(props) {
    super(props)
    this.state = getState()
    this.handleDeleteUsers = this.handleDeleteUsers.bind(this)
    this.handleCreateUser  = this.handleCreateUser.bind(this)
  }

  componentWillMount() {
      this.props.actions.getUsers()
  }


  handleDeleteUsers(userIds){
    console.log(userIds)
  }

  handleCreateUser(userData){
    console.log(userData)
  }

  render () {
    const {users, actions} = this.props
    let usersMock = [
      {
        _id: 0,
        name : 'tony',
        email : 'tony@tony.com'
      },
      {
        _id: 1,
        name : 'sdfsdftosdfdsfny',
        email : 'tony@tony.com'
      },
      {
        _id: 2,
        name : 'mnbmnbmbnmtonsdfsdfy',
        email : 'tony@tony.com'
      },
      {
        _id: 3,
        name : 'jfdsdasmn',
        email : 'tony@tony.com'
      },
      {
        _id: 4,
        name : 'tonewrwer',
        email : 'tony@tony.com'
      },
      {
        _id: 5,
        name : 'tonypoiuyumnbmnbmb',
        email : 'tony@tony.com'
      }
    ]
    return (
      <section className="Users">
        <h1>Users </h1>
        <ItemListView items={ usersMock } deleteItems={this.handleDeleteUsers} apiPath="users"/>
        <UserCreateEdit title="User" user={ usersMock[0] } onSubmit={ this.handleCreateUser } />
     </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    router: state.router
  }
}

function mapDispatchToProps(dispatch) {
  return { actions : bindActionCreators(userActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
