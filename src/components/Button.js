import React, { Component, PropTypes } from 'react'

export default class Button extends Component {
    static propTypes = {
      children: PropTypes.node,
      className : PropTypes.string,
      title : PropTypes.string,
      onClick : PropTypes.func
    }
    render() {
        let newClassName = this.props.className || '';
        let newTitle = this.props.title || '';

        return (
            <button className={newClassName} onClick={this.props.onClick} title={newTitle} ref="button">{this.props.children}</button>
        );
    }
}
