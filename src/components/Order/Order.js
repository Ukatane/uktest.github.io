import React from 'react';

import classes from './Order.module.css';

const Order = props => {
  let ingred = {
    salad: 2,
    bacon: 3,
    meat: 4,
    cheese: 5,
  };

  // let ingredients = Object.keys(ingred)
  //   .map(ikey => {
  //     let inKey = {};
  //     inKey.name = ikey;
  //     inKey.amount = ingred[ikey];
  //     return inKey;
  //   })
  //   .map(i => {
  //     return (
  //       <p>
  //         Ingredient: {i.name} ({i.amount})
  //       </p>
  //     );
  //   });

  let ingredients = [];

  // ingred should be props.ingredients
  for (let ing in ingred) {
    ingredients.push([ing, ingred[ing]]);
  }

  const showIngredients = ingredients.map(igKey => {
    return (
      <span
        key={igKey[0]}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: 5,
          borderRadius: 5,
          boxShadow: '1px 2px 3px #ccc',
        }}
      >
        {igKey[0]} ({igKey[1]})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>
        <strong style={{ fontSize: 18, textTransform: 'uppercase' }}>
          Ingredients :
        </strong>{' '}
        {showIngredients}
      </p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
