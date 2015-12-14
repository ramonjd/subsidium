import React, { Component, PropTypes } from 'react'
import Immutable from 'seamless-immutable'
import { Link } from 'react-router'
import Button from './Button'
import FilterItems from './FilterItems'
import {ui} from '../constants/'


let getInitialState = () => {
    return {
        itemIdsToDelete : [],
        filteredItemsIds : []
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
   this.handleDelete = this.handleDelete.bind(this)
   this.handleCheckboxChange  = this.handleCheckboxChange.bind(this)
  }

  componentWillMount() {

  }

  componentDidUpdate() {

  }

  filterItems(filterTerm){
    let mutableList = Immutable(this.props.items).asMutable()
    let filteredItems = []
    if (filterTerm && filterTerm.length > 0) {
       let filteredItems = mutableList.map((item, i) => {
         if (item.name.search(filterTerm) === 0) {
           return item._id;
         }
       })
       console.log('filteredItems', filteredItems)
       this.setState({
         filteredItemsIds : filteredItems
       })
    } else {
      this.setState({
        filteredItemsIds : filteredItems
      })
    }
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
    const { items, apiPath } = this.props
    const filteredItemsIdsLength = this.state.filteredItemsIds.length;
    let itemsList = Immutable(items).asMutable().map((item, i) => {
      if (filteredItemsIdsLength > 0 && this.state.filteredItemsIds.indexOf(item._id) > -1) {
        console.log('rendered filtered item')
        return (
          <li key={ i }>
            <Link to={`/${apiPath}/${item._id}`}>{ item.name }</Link>
            <input className="itemCheckbox" type="checkbox" name={item._id} value={item._id} onChange={this.handleCheckboxChange.bind(this, item._id)}/>
          </li>)
      } else if (filteredItemsIdsLength === 0) {
        return (
          <li key={ i }>
            <Link to={`/${apiPath}/${item._id}`}>{ item.name }</Link>
            <input className="itemCheckbox" type="checkbox" name={item._id} value={item._id} onChange={this.handleCheckboxChange.bind(this, item._id)}/>
          </li>)
      }

    })

    return (
      <div className="ItemListView">
        { this.state.itemIdsToDelete.length > 0 ? <Button className="deleteItems" onClick={this.handleDelete}>Delete selected</Button>  : null }
        { this.props.items && this.props.items.length > 2 ? <FilterItems handleChange={this.filterItems}/>  : null }
        <ul>
          { itemsList }
        </ul>
      </div>
      )
    }
}
