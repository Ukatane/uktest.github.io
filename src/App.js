import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout.js';
import store from './redux/store';
import { authCheckState } from './redux/actions/auth';
import { RadioSpinner } from './components/UI/Spinner/Spinner';

// lazy loading or code splitting
const Checkout = React.lazy(() =>
  import('./containers/Checkout/Checkout' /* Checkout chunk */)
);
const Orders = React.lazy(() =>
  import('./containers/Orders/Orders' /* Orders chunk */)
);

const App = props => {
  useEffect(() => {
    store.dispatch(authCheckState());
  }, []);

  let routes = (
    <Switch>
      <Route path='/' exact component={BurgerBuilder} />
      <Route path='/auth' exact component={Auth} />
      <Redirect to='/' />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' exact component={Auth} />
        <Route path='/checkout' render={props => <Checkout {...props} />} />

        {/* when using render in the route make sure to receive the route's props */}
        <Route path='/orders' exact render={props => <Orders {...props} />} />
        <Route path='/logout' exact component={Logout} />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<RadioSpinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default withRouter(connect(mapStateToProps)(App));
