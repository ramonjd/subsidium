import React, {Component} from 'react'

export default class DataWrapper extends Component {

    static childContextTypes = {
        data: React.PropTypes.object.isRequired
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
