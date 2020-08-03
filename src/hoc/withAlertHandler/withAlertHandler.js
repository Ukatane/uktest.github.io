import React, { useState, useEffect } from 'react';

import Alert from '../../components/UI/Alert/Alert';

const withAlertHandler = (WrappedComponent, axios) => {
  return props => {
    const [state, setState] = useState({
      alert: false,
      AlertType: null,
      AlertMsg: null,
      fontSize: null,
    });

    const reqInterceptor = axios.interceptors.request.use(req => {
      setState({
        alert: false,
        AlertType: null,
        AlertMsg: null,
        fontSize: null,
      });
      return req;
    });

    const resInterceptor = axios.interceptors.response.use(
      res => {
        setState({
          alert: true,
          AlertType: 'success',
          AlertMsg: 'Successful',
          fontSize: 18,
        });

        setTimeout(() => setState({ ...state, alert: false }), 5000);
        return res;
      },
      err => {
        setState({
          ...state,
          alert: true,
          AlertType: 'danger',
          AlertMsg: err.message,
        });

        setTimeout(() => setState({ ...state, alert: false }), 5000);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const closeAlert = () => setState({ ...state, alert: false });

    return (
      <React.Fragment>
        <Alert
          type={state.AlertType}
          msg={state.AlertMsg}
          fontSize={state.fontSize}
          show={state.alert}
          closeAlert={closeAlert}
        />
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withAlertHandler;
