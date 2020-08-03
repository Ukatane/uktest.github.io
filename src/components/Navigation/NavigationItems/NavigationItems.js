import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem href='/'> Burger Builder </NavigationItem>
    {props.isAuthenticated && (
      <NavigationItem href='/orders'> Orders </NavigationItem>
    )}

    {props.isAuthenticated ? (
      <NavigationItem href='/logout'> Logout </NavigationItem>
    ) : (
      <NavigationItem href='/auth'> Authenticate </NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
