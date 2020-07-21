import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import axios from '../../../axios-orders';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  orderFormHelperFunc = (elN, elT = 'input', elCT = 'text', elCP, v = '') => {
    return {
      elementName: elN,
      elementType: elT,
      elementConfig: {
        type: elCT,
        placeholder: elCP,
      },
      value: v,
      validation: {
        required: true,
      },
      isValid: false,
    };
  };

  state = {
    orderForm: {
      name: this.orderFormHelperFunc('name', 'input', 'text', 'Your Name'),
      street: this.orderFormHelperFunc(
        'street',
        'input',
        'text',
        'Your street'
      ),
      zipCode: this.orderFormHelperFunc(
        'zipCode',
        'input',
        'text',
        'Your postal code'
      ),
      country: this.orderFormHelperFunc(
        'country',
        'input',
        'text',
        'Your country'
      ),
      email: this.orderFormHelperFunc('email', 'input', 'text', 'Your email'),
      deliveryMethod: {
        elementName: 'deliveryMethod',
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayName: 'Fastest' },
            { value: 'cheapest', displayName: 'Cheapest' },
          ],
        },
        value: null,
      },
    },
    loading: false,
  };

  checkValidity = (value, rules) => {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    return isValid;
  };

  orderHandler = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    const formData = {};

    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };

    try {
      await axios.post(`/orders.json`, order);

      this.props.history.push('/');

      this.setState({ loading: false, modal: false });
    } catch (err) {
      this.setState({
        loading: false,
        modal: false,
      });
      console.log(err);
    }
  };

  changeHandler = e => {
    const handleInput = {
      ...this.state.orderForm,
    };

    // deep clone
    // might not be necessary here cause i eventually want to mutate the state
    handleInput[e.target.name] = {
      ...handleInput[e.target.name],
    };

    handleInput[e.target.name].elementConfig = {
      ...handleInput[e.target.name].elementConfig,
    };

    handleInput[e.target.name].value = e.target.value;

    handleInput[e.target.name].isValid = this.checkValidity(
      handleInput[e.target.name].value,
      handleInput[e.target.name].validation
    );

    console.log(handleInput);

    this.setState({ orderForm: handleInput });
  };

  render() {
    const orderFormToArray = [];

    const formInput = {
      ...this.state.orderForm,
    };

    for (let inp in formInput) {
      orderFormToArray.push({
        ...formInput[inp],
      });
    }

    const orderForm = orderFormToArray.map((input, i) => {
      return (
        <Input
          key={i}
          inputtype={input.elementType}
          type={input.elementConfig.type}
          name={input.elementName}
          placeholder={input.elementConfig.placeholder}
          value={input.value}
          options={input.elementConfig.options}
          onChange={this.changeHandler}
        />
      );
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {orderForm}
        <Button type='Success' clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
