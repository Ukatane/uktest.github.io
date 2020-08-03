import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
  const [state, setState] = useState({
    ingredients: null,
    price: 4,
  });

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    setState({ ingredients, price });
  }, []);

  const cancelCheckoutHandler = () => props.history.goBack();

  const continueCheckoutHandler = () =>
    props.history.replace('/checkout/contact-data');

  let checkout = <div>Loading...</div>;

  if (props.ingredients) {
    checkout = (
      <CheckoutSummary
        ingredients={props.ingredients}
        cancelCheckout={cancelCheckoutHandler}
        continueCheckout={continueCheckoutHandler}
      />
    );
  }

  return (
    <React.Fragment>
      {checkout}
      <Route
        path={`${props.match.url}/contact-data`}
        exact
        component={ContactData}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  ingredients: state.ingredients.ingredients,
});

export default connect(mapStateToProps)(Checkout);
