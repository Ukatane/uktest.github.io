import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchOrders } from '../../redux/actions/Orders';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withAlertHandler from '../../hoc/withAlertHandler/withAlertHandler';

const Orders = props => {
  useEffect(() => {
    props.fetchOrders(props.token, props.userId);
  }, []);

  const order = props.orders.map(order => (
    <Order
      key={order.id}
      ingredients={order.ingredients}
      price={+order.price}
    />
  ));

  return props.loading ? <Spinner /> : <div>{order}</div>;
};

const mapStateToProps = state => ({
  orders: state.orders.orders,
  loading: state.orders.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, {
  fetchOrders,
})(withAlertHandler(Orders, axios));
