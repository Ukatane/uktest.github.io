import React from 'react';

import classes from './Button.module.css';
import PropTypes from 'prop-types';

const Button = props => {
  let buttonClasses = [classes.Button, classes[props.type]];

  return (
    <button
      {...props}
      className={buttonClasses.join(' ')}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Button;
