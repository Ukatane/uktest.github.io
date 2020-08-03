import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from '../Auth/Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { auth, setAuthRedirectPath } from '../../redux/actions/auth';
import { checkValidity } from '../../shared/utils';

const Auth = props => {
  const [controls, setControls] = useState({
    email: {
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      value: '',
      validation: {
        required: true,
        minLength: 6,
        maxLength: 10,
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignup, setIsSignup] = useState(true);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== '/') {
      props.setAuthRedirectPath('/');
    }
  }, []);

  const changeHandler = e => {
    const handleInput = {
      ...controls,
    };

    // deep clone
    handleInput[e.target.name] = {
      ...handleInput[e.target.name],
    };

    handleInput[e.target.name].elementConfig = {
      ...handleInput[e.target.name].elementConfig,
    };

    handleInput[e.target.name].value = e.target.value;

    handleInput[e.target.name].valid = checkValidity(
      handleInput[e.target.name].value,
      handleInput[e.target.name].validation
    );

    handleInput[e.target.name].touched = true;

    setControls(handleInput);

    // this.setState({ controls: handleInput });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.auth(controls.email.value, controls.password.value, isSignup);
  };

  const handleSwitch = () => {
    setIsSignup(prevState => !prevState);
    // this.setState(prevState => ({
    //   isSignup: !prevState.isSignup,
    // }));
  };

  const highlightError = field => {
    return props.error && props.error.message.toLowerCase().includes(field);
  };

  let view = <Spinner />;

  if (!props.loading) {
    view = (
      <form onSubmit={handleSubmit}>
        <Input
          name='email'
          type='email'
          placeholder='Enter email'
          value={controls.email.value}
          isValid={controls.email.valid}
          touched={controls.email.touched}
          inValid={!controls.email.valid}
          style={{
            borderColor: highlightError('email') ? 'red' : null,
            backgroundColor: highlightError('email') ? '#fbbcb5' : null,
          }}
          onChange={changeHandler}
        />
        <Input
          name='password'
          type='password'
          placeholder='Enter password'
          value={controls.password.value}
          isValid={controls.password.valid}
          inValid={!controls.password.valid}
          touched={controls.password.touched}
          style={{
            borderColor: highlightError('password') ? 'red' : null,
            backgroundColor: highlightError('password') ? '#fbbcb5' : null,
          }}
          onChange={changeHandler}
        />
        <Button type='Success' clicked={handleSubmit}>
          {isSignup ? 'SignUp' : 'SignIn'}
        </Button>
      </form>
    );
  }

  let authRedirect = null;

  if (props.isAuthenticated) {
    // this approach works perfectly
    /*
        if (this.props.buildingBurger) {
          this.props.history.replace('/checkout');
        } else {
          this.props.history.replace('/');
        }
        */

    // this approach would be great if i have to perform similar functions
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {props.error && <p>{props.error.message}</p>}

      <label>Fill in your details</label>
      {view}

      <Button type='Danger' clicked={handleSwitch}>
        SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.ingredients.building,
  authRedirectPath: state.auth.authRedirectPath,
});

export default connect(mapStateToProps, {
  auth,
  setAuthRedirectPath,
})(Auth);
