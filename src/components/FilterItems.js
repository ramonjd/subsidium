import React, { Component, PropTypes } from 'react'
import Button from './Button'

export default class FilterItems extends Component {
    static propTypes = {
      handleChange:  PropTypes.func.isRequired
    }

    constructor(props) {
      super(props)
      this.clearFilter = this.clearFilter.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
      this.props.handleChange(e.target.value.trim())
    }

    clearFilter(){
      this.refs.filterItems.value = ''
      this.props.handleChange('')
    }

    render() {
        return (
          <div className="FilterItems">
            <label htmlFor="filterItems">Filter list</label>
            <input ref="filterItems" onChange={this.handleChange} type="search" id="filterItems" name="filterItems" placeholder="Filter..." />
            <Button className="clearFilter" onClick={this.clearFilter}>Clear</Button>
          </div>
        );
    }
}
