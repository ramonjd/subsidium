if (process.env.BROWSER) {
  require('../styles/Modal.scss')
}

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { ui } from '../constants/'
import Button from './Button'

export default class Modal extends Component {
    static propTypes = {
      title : PropTypes.string,
      content : PropTypes.string,
      affirmText : PropTypes.string,
      cancelText : PropTypes.string,
      onAffirm : PropTypes.func,
      onCancel: PropTypes.func,
      show : PropTypes.bool
    }
    render() {
        let modalClassName = this.props.show ? "Modal active" : "Modal"
        return (
          <div className={modalClassName} aria-hidden={!this.props.show}>
            <div className="ModalWrapper">
              <h4>{this.props.title}</h4>
              <p><em>{this.props.content}</em></p>
              <div className="ModalButtons">
                {this.props.onAffirm ? <Button className="affirmModal" onClick={this.props.onAffirm}>{this.props.affirmText}</Button> : null}
                {this.props.onCancel ? <Button className="cancelModal" onClick={this.props.onCancel}>{this.props.cancelText}</Button> : null}
              </div>
            </div>
          </div>
        )
    }
}
