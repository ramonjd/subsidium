if (process.env.BROWSER) {
  require('../styles/ItemListView.scss')
}


import React, { Component, PropTypes } from 'react'
import Immutable from 'seamless-immutable'
import { Link } from 'react-router'
import FilterItems from './FilterItems'
import {ui} from '../constants/'


let getInitialState = () => {
    return {
        filteredItemsIds : []
    }
}

export default class ItemListView extends Component {

  static propTypes = {
    items:  PropTypes.arrayOf(React.PropTypes.object).isRequired,
    apiPath:  PropTypes.string.isRequired
  }

  constructor(props) {
   super(props)
   this.state = getInitialState()
   this.filterItems = this.filterItems.bind(this)
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
       this.setState({
         filteredItemsIds : filteredItems
       })
    } else {
      this.setState({
        filteredItemsIds : filteredItems
      })
    }
  }

  render () {
    const { items, apiPath } = this.props
    const filteredItemsIdsLength = this.state.filteredItemsIds.length;
    //
    // let itemsList = Immutable(items).asMutable().map((item, i) => {
    //   if (filteredItemsIdsLength === 0 || (filteredItemsIdsLength > 0 && this.state.filteredItemsIds.indexOf(item._id) > -1)) {
    //     return (
    //       <li key={ i }>
    //         <Link to={`/${apiPath}/${item._id}`}>{ item.name }</Link>
    //       </li>)
    //   }
    // })

    return (
      <div className="ItemListView">
        { this.props.items && this.props.items.length > ui.MIN_ITEMS_BEFORE_FILTER ? <FilterItems handleChange={this.filterItems}/>  : null }
        <ul>
          { Immutable(items).asMutable().map((item, i) => {
              return (
                <li key={ i }>
                  <Link to={`/${apiPath}/${item._id}`}>{ item.name }</Link>
                </li>)

          }) }
        </ul>
      </div>
      )
    }
}
