import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    let modalClasses = [classes.Modal];

    if (this.props.show) {
      modalClasses = [classes.Modal, classes.Open, classes.Opacity - 1];
    } else {
      modalClasses = [classes.Modal, classes.Trans, classes.Opacity - 0];
    }

    return (
      <React.Fragment>
        <Backdrop show={this.props.show} removeModal={this.props.removeModal} />
        <div className={modalClasses.join(' ')}>{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default Modal;
