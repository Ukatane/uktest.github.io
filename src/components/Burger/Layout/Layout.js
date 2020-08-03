import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';

const Layout = ({ children, isAuthenticated }) => {
  const [show, setShow] = useState(false);

  const removeBackdrop = () => {
    setShow(false);
  };

  const toggleSideDrawer = () => {
    setShow(!show);
  };

  return (
    <React.Fragment>
      <Toolbar clicked={toggleSideDrawer} isAuth={isAuthenticated} />
      <SideDrawer
        show={show}
        clicked={removeBackdrop}
        isAuth={isAuthenticated}
      />
      <main className={classes.Content}>{children}</main>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
