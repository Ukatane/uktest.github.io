import React from 'react';

import classes from './Input.module.css';

const Input = props => {
  let inputElement = null;

  switch (props.inputtype) {
    case 'input':
      inputElement = <input {...props} />;
      break;
    case 'textarea':
      inputElement = <textarea {...props} />;
      break;
    case 'select':
      inputElement = (
        <select value={props.value} className={classes.InputEl}>
          {props.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.displayName}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
