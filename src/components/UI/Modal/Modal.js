import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     nextProps.show !== this.props.show ||
  //     nextProps.children !== this.props.children
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  let modalClasses = [classes.Modal];

  if (props.show) {
    modalClasses = [classes.Modal, classes.Open, classes.Opacity - 1];
  } else {
    modalClasses = [classes.Modal, classes.Trans, classes.Opacity - 0];
  }

  return (
    <React.Fragment>
      <Backdrop show={props.show} removeModal={props.removeModal} />
      <div className={modalClasses.join(' ')}>{props.children}</div>
    </React.Fragment>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
