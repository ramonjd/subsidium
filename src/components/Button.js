import React, { Component, PropTypes } from 'react'

export default class Button extends Component {
    static propTypes = {
      children: PropTypes.node,
      className : PropTypes.string,
      onClick : PropTypes.func
    }
    render() {
        let newClassName = this.props.className || '';
        return (
            <button className={newClassName} onClick={this.props.onClick} ref="button">{this.props.children}</button>
        );
    }
}
