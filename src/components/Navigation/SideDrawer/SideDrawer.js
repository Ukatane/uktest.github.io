import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
  let sideDrawer = [classes.SideDrawer, classes.Close];

  if (props.show) {
    sideDrawer = [classes.SideDrawer, classes.Open];
  }

  return (
    <React.Fragment>
      <Backdrop show={props.show} removeModal={props.clicked} />
      <div className={sideDrawer.join(' ')} onClick={props.clicked}>
        <Logo height='11%' />
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
