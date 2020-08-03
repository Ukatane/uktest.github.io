import React from 'react';
import { CheckCircle, Star } from 'react-feather';

import classes from './Input.module.css';

const Input = props => {
  let inputClasses = [classes.InputEl];

  if (props.inValid && props.touched) inputClasses.push(classes.Error);

  let inputElement = null;

  switch (props.inputtype) {
    case 'input':
      inputElement = <input {...props} className={inputClasses.join(' ')} />;
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {inputElement}
        <span>
          {props.isValid ? (
            <CheckCircle color='green' size={22} />
          ) : (
            <Star color='#ff3903' size={22} />
          )}
        </span>
      </div>
    </div>
  );
};

export default Input;
