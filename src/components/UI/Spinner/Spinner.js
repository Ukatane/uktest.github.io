import React from 'react';

import classes from './Spinner.module.css';

const Spinner = () => <div className={classes.Loader}>Loading...</div>;

export const RadioSpinner = () => <div className={classes.RadioSpinner}></div>;

export default Spinner;
