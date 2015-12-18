import React, {Component} from 'react'
import stores from '../flux/stores/'

export default class DataWrapper extends Component {

    static childContextTypes = {
        data: React.PropTypes.object.isRequired
    }

    constructor(props){
      super(props)
      for (var key in this.props.data) {
        if (stores[key]) {
          stores[key].setState(this.props.data[key])
        }
      }
    }

    getChildContext () {
        return {
            data: this.props.data
        }
    }

    render () {
        return this.props.children;
    }
}
