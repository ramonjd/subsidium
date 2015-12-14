import React, { Component, PropTypes } from 'react'
import Immutable from 'seamless-immutable'
import { Link } from 'react-router'
import Button from './Button'
import FilterItems from './FilterItems'
import {ui} from '../constants/'


let getInitialState = () => {
    return {
        items : [],
        itemIdsToDelete : []
    }
}

export default class ItemListView extends Component {

  static propTypes = {
    items:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
    deleteItems:  PropTypes.func.isRequired,
    apiPath:  PropTypes.string.isRequired
  }

  constructor(props) {
   super(props)
   this.state = getInitialState()
   this.filterItems = this.filterItems.bind(this)
   this.renderFilterItems = this.renderFilterItems.bind(this)
   this.handleDelete = this.handleDelete.bind(this)
   this.handleCheckboxChange  = this.handleCheckboxChange.bind(this)
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

  handleCheckboxChange(id, e){
    let checked = e.target.checked
    let itemIds = []

    if (checked === true) {
      itemIds = this.state.itemIdsToDelete.concat([id])
    } else {
      itemIds = this.state.itemIdsToDelete.filter((item, i) => {
        return item !== id
      })
    }
    this.setState({
      itemIdsToDelete : itemIds
    })
  }

  handleDelete() {
    this.props.deleteItems(this.state.itemIdsToDelete)
  }

  render () {
    const {updateItem, deleteItem, apiPath } = this.props
    let itemsList = this.state.items.map((item, i) => {
      return (
        <li key={ i }>
          <Link to={`/${apiPath}/${item._id}`}>{ item.name }</Link>
          <input type="checkbox" name={item._id} value={item._id} onChange={this.handleCheckboxChange.bind(this, item._id)}/>
        </li>)
    })
    return (
      <div className="ItemListView">
        { this.state.itemIdsToDelete.length > 0 ? <Button className="deleteItems" onClick={this.handleDelete}>Delete selected</Button>  : null }
        { this.props.items && this.props.items.length > ui.MIN_ITEMS_BEFORE_FILTER ? this.renderFilterItems()  : null }
        <ul>
          { itemsList }
        </ul>
      </div>
      )
    }
}
