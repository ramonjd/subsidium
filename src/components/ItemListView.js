import React, { Component, PropTypes } from 'react'
import Immutable from 'seamless-immutable'
import { Link } from 'react-router'
import Button from './Button'
import FilterItems from './FilterItems'
import {ui} from '../constants/'


let getInitialState = () => {
    return {
        users : []
    }
}

export default class ItemListView extends Component {

  static propTypes = {
    items:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
    deleteItem:  PropTypes.func.isRequired,
    updateItem:  PropTypes.func.isRequired,
    apiPath:  PropTypes.string.isRequired
  }

  constructor(props) {
   super(props)
   this.state = getInitialState()
   this.filterItems = this.filterItems.bind(this)
   this.renderFilterItems = this.renderFilterItems.bind(this)
  }

  componentWillMount() {
     this.setState({
       items : Immutable(this.props.items).asMutable()
     })
  }

  filterItems(filterTerm){
    let mutableList = Immutable(this.props.items).asMutable()
    let filteredItems = []
    if (filterTerm && filterTerm.length > 0) {
       let filteredItems = mutableList.filter((item, i) =>{
         return item.name.search(filterTerm) === 0
       })
       this.setState({
         items : filteredItems
       })
    } else {
      this.setState({
        items : mutableList
      })
    }
  }

  renderFilterItems(){
    return (
      <FilterItems handleChange={this.filterItems}/>
    )
  }

  render () {
    const {updateItem, deleteItem, apiPath } = this.props
    let itemsList = this.state.items.map((item, i) => {
      return (
        <li key={ i }>
          <Link to={`/${apiPath}/${item._id}`}>{ item.name }</Link>
          <Button className="updateItem" onClick={this.props.updateItem.bind(this, item._id)}>Edit</Button>
          <Button className="deleteItem" onClick={this.props.deleteItem.bind(this, item._id)}>Delete</Button>
        </li>)
    })
    return (
      <div className="ItemListView">
        { this.props.items && this.props.items.length > ui.MIN_ITEMS_BEFORE_FILTER ? this.renderFilterItems()  : null }
        <ul>
        { itemsList }
        </ul>
      </div>
      )
    }
}
