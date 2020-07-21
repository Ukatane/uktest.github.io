import React from 'react';
// import { withRouter } from 'react-router-dom';

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

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    modal: false,
    loading: false,
    error: false,
  };

  async componentDidMount() {
    console.log(this.props);

    // try {
    //   const res = await axios.get('/ingredients.json');

    //   console.log(res);

    //   this.setState({ ingredients: res.data, error: false });
    // } catch (err) {
    //   console.log(err);
    //   this.setState({ error: true });
    // }
  }

  updatePurchase(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = type => {
    const count = this.state.ingredients[type] + 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = count;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchase(updatedIngredients);
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }

    const count = this.state.ingredients[type] - 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = count;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchase(updatedIngredients);
  };

  showModal = () => {
    this.setState({ modal: true });
  };

  removeModal = () => {
    this.setState({ modal: false });
  };

  checkoutHandler = () => {
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  render() {
    const {
      ingredients,
      modal,
      purchaseable,
      totalPrice,
      loading,
      error,
    } = this.state;

    let disabledInfo;

    if (ingredients) {
      disabledInfo = {
        ...ingredients,
      };

      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    }

    let burger = (
      <React.Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={purchaseable}
          price={totalPrice}
          showModal={this.showModal}
        />
      </React.Fragment>
    );

    let orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        removeModal={this.removeModal}
        checkout={this.checkoutHandler}
        price={totalPrice}
      />
    );

    if (loading || !ingredients) {
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal show={modal} removeModal={this.removeModal}>
          {orderSummary}
        </Modal>

        {ingredients ? (
          burger
        ) : error ? (
          <p>cannot load ingredients</p>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}

export default withAlertHandler(BurgerBuilder, axios);
// export default BurgerBuilder;
