import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import withAlertHandler from '../../../hoc/withAlertHandler/withAlertHandler';
import { checkValidity } from '../../../shared/utils';

const ContactData = props => {
  const orderFormHelperFunc = (
    elN,
    elT = 'input',
    elCT = 'text',
    elCP,
    value = '',
    minL = null,
    maxL = null
  ) => {
    return {
      elementName: elN,
      elementType: elT,
      elementConfig: {
        type: elCT,
        placeholder: elCP,
      },
      value: value,
      validation: {
        required: true,
        minLength: minL,
        maxLength: maxL,
      },
      isValid: false,
      touched: false,
    };
  };

  const [orderForm, setOrderForm] = useState({
    name: orderFormHelperFunc('name', 'input', 'text', 'Your Name'),
    street: orderFormHelperFunc('street', 'input', 'text', 'Your street'),
    zipCode: orderFormHelperFunc(
      'zipCode',
      'input',
      'number',
      'Your postal code',
      '',
      5,
      8
    ),
    country: orderFormHelperFunc('country', 'input', 'text', 'Your country'),
    email: orderFormHelperFunc('email', 'input', 'text', 'Your email'),
    deliveryMethod: {
      elementName: 'deliveryMethod',
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayName: 'Fastest' },
          { value: 'cheapest', displayName: 'Cheapest' },
        ],
      },
      value: 'fastest',
    },
  });

  const [formIsValid, setFormIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const { name, email, zipCode, street, country } = orderForm;

  useEffect(() => {
    if (
      email.isValid &&
      name.isValid &&
      zipCode.isValid &&
      street.isValid &&
      country.isValid
    ) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [name, email, zipCode, street, country]);

  // i outsourced checkValidity to the shared folder since its something i use all through my app

  /*
  checkValidity = (value, rules) => {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }

    return isValid;
  };
  */

  const orderHandler = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = {};

    for (let key in orderForm) {
      formData[key] = orderForm[key].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    try {
      await axios.post(`/orders.json?auth=${props.token}`, order);

      props.history.push('/');

      setLoading(false);
      // setModal(false);
    } catch (err) {
      setLoading(false);
      // setModal(false);
    }
  };

  const changeHandler = e => {
    const handleInput = {
      ...orderForm,
    };

    // deep clone
    handleInput[e.target.name] = {
      ...handleInput[e.target.name],
    };

    handleInput[e.target.name].elementConfig = {
      ...handleInput[e.target.name].elementConfig,
    };

    handleInput[e.target.name].value = e.target.value;

    handleInput[e.target.name].isValid = checkValidity(
      handleInput[e.target.name].value,
      handleInput[e.target.name].validation
    );

    handleInput[e.target.name].touched = true;

    setOrderForm(handleInput);

    // this.setState(
    //   prevState => {
    //     return { orderForm: handleInput };
    //   },
    //   () => {
    //     const { name, email, zipCode, street, country } = orderForm;

    //     if (
    //       email.isValid &&
    //       name.isValid &&
    //       zipCode.isValid &&
    //       street.isValid &&
    //       country.isValid
    //     ) {
    //       setFormIsValid(false);
    //     } else {
    //       setFormIsValid(true);
    //     }
    //   }
    // );
  };

  const orderFormToArray = [];

  const formInput = {
    ...orderForm,
  };

  for (let inp in formInput) {
    orderFormToArray.push({
      ...formInput[inp],
    });
  }

  const orderForms = orderFormToArray.map((input, i) => {
    return (
      <Input
        key={i}
        inputtype={input.elementType}
        type={input.elementConfig.type}
        name={input.elementName}
        placeholder={input.elementConfig.placeholder}
        value={input.value}
        isValid={input.isValid}
        inValid={!input.isValid}
        touched={input.touched}
        options={input.elementConfig.options}
        onChange={changeHandler}
      />
    );
  });

  let form = (
    <form onSubmit={orderHandler}>
      {orderForms}
      <Button type='Success' disabled={formIsValid} clicked={orderHandler}>
        ORDER
      </Button>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => ({
  ingredients: state.ingredients.ingredients,
  price: state.ingredients.totalPrice,
  userId: state.auth.userId,
  token: state.auth.token,
});

export default connect(mapStateToProps)(withAlertHandler(ContactData, axios));
