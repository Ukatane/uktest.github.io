import React from 'react';

import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Yummy!!!</h1>
      <div style={{ width: '100%' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type='Danger' clicked={props.cancelCheckout}>
        CANCEL
      </Button>
      <Button type='Success' clicked={props.continueCheckout}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
