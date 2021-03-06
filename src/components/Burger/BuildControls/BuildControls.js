import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = ({
  ingredientAdded,
  ingredientRemoved,
  price,
  disabled,
  purchaseable,
  showModal,
  isAuth,
}) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>${price.toFixed(2)}</strong>{' '}
    </p>

    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        type={ctrl.type}
        ingredientAdded={ingredientAdded}
        ingredientRemoved={ingredientRemoved.bind(this, ctrl.type)}
        disabled={disabled[ctrl.type]}
      />
    ))}

    <button
      className={classes.OrderButton}
      disabled={!purchaseable}
      onClick={showModal}
    >
      {isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
);

export default BuildControls;
