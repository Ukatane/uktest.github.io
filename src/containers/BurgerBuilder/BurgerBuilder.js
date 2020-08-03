import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  initialIngredients,
  addIngredients,
  removeIngredients,
} from '../../redux/actions/BurgerBuilder';
import { setAuthRedirectPath } from '../../redux/actions/auth';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withAlertHandler from '../../hoc/withAlertHandler/withAlertHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.8,
  meat: 1.5,
  bacon: 1.3,
};

const BurgerBuilder = props => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.initialIngredients();
  }, []);

  const updatePurchase = ingredients => {
    if (ingredients) {
      const sum = Object.keys(ingredients)
        .map(igKey => {
          return ingredients[igKey];
        })
        .reduce((sum, el) => {
          return sum + el;
        }, 0);

      return sum > 0;
    }
  };

  // const addIngredientHandler = type => {
  //   const count = this.state.ingredients[type] + 1;

  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };

  //   updatedIngredients[type] = count;

  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice,
  //   });
  //   this.updatePurchase(updatedIngredients);
  // };

  // const removeIngredientHandler = type => {
  //   if (this.state.ingredients[type] <= 0) {
  //     return;
  //   }

  //   const count = this.state.ingredients[type] - 1;

  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };

  //   updatedIngredients[type] = count;

  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice,
  //   });
  //   this.updatePurchase(updatedIngredients);
  // };

  const showModal = () => {
    if (props.isAuthenticated) {
      setModal(true);
    } else {
      props.setAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const removeModal = () => {
    setModal(false);
  };

  const checkoutHandler = () => {
    props.history.push('/checkout');

    // const queryParams = [];

    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       '=' +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }

    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');

    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString,
    // });
  };

  let disabledInfo;

  if (props.ingredients) {
    disabledInfo = {
      ...props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
  }

  let burger = (
    <React.Fragment>
      <Burger ingredients={props.ingredients} />
      <BuildControls
        ingredientAdded={props.addIngredients}
        ingredientRemoved={props.removeIngredients}
        disabled={disabledInfo}
        purchaseable={updatePurchase(props.ingredients)}
        price={props.price}
        isAuth={props.isAuthenticated}
        showModal={showModal}
      />
    </React.Fragment>
  );

  let orderSummary = (
    <OrderSummary
      ingredients={props.ingredients}
      removeModal={removeModal}
      checkout={checkoutHandler}
      price={props.price}
    />
  );

  if (props.loading || !props.ingredients) {
    orderSummary = <Spinner />;
  }

  return (
    <React.Fragment>
      <Modal show={modal} removeModal={removeModal}>
        {orderSummary}
      </Modal>

      {props.ingredients ? (
        burger
      ) : props.error ? (
        <p>cannot load ingredients</p>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  ingredients: state.ingredients.ingredients,
  price: state.ingredients.totalPrice,
  loading: state.ingredients.loading,
  error: state.ingredients.error,
  isAuthenticated: state.auth.token !== null,
});

export { BurgerBuilder };

export default connect(mapStateToProps, {
  initialIngredients,
  addIngredients,
  removeIngredients,
  setAuthRedirectPath,
})(withAlertHandler(BurgerBuilder, axios));
