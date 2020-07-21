import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem href='/'> Burger Builder </NavigationItem>
    <NavigationItem href='/orders'> Orders </NavigationItem>
  </ul>
);

export default NavigationItems;
