import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' exact component={Orders} />
            <Route
              render={() => (
                <div style={{ fontSize: 24, textAlign: 'center ' }}>
                  {' '}
                  Page not found{' '}
                </div>
              )}
            />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
