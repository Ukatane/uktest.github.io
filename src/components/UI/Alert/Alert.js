import React from 'react';

import classes from './Alert.module.css';
import { CheckCircle, X } from 'react-feather';

const Alert = ({ show, msg, type, closeAlert, fontSize }) => {
  let alert = [classes.Alert, classes.Close];
  let alertIcon;

  if (show) {
    alert = [classes.Alert, classes.Open];
    type === 'danger'
      ? (alertIcon = <X color='#ed4337' size={32} />)
      : (alertIcon = <CheckCircle size={36} color='#00ab66' />);
  }

  return (
    <div className={alert.join(' ')} onClick={closeAlert}>
      <div className={classes.AlertMsg}>
        <p style={{ color: '#7C8C94', fontSize: fontSize }}> {msg} </p>
      </div>
      <div className={classes.Icon}>{alertIcon}</div>
    </div>
  );
};

export default Alert;
