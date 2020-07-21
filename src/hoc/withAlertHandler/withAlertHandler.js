import React from 'react';

import Alert from '../../components/UI/Alert/Alert';

const withAlertHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      alert: false,
      AlertType: null,
      AlertMsg: null,
      fontSize: null,
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ alert: false, AlertType: null, AlertMsg: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        res => {
          this.setState({
            alert: true,
            AlertType: 'success',
            AlertMsg: 'Successful',
            fontSize: 18,
          });

          setTimeout(() => this.setState({ alert: false }), 5000);
          return res;
        },
        err => {
          this.setState({
            alert: true,
            AlertType: 'danger',
            AlertMsg: err.message,
          });

          setTimeout(() => this.setState({ alert: false }), 5000);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    closeAlert = () => this.setState({ alert: false });

    render(props) {
      return (
        <React.Fragment>
          <Alert
            type={this.state.AlertType}
            msg={this.state.AlertMsg}
            fontSize={this.state.fontSize}
            show={this.state.alert}
            closeAlert={this.closeAlert}
          />
          <WrappedComponent {...props} {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withAlertHandler;
