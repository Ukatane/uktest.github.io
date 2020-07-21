import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withAlertHandler from '../../hoc/withAlertHandler/withAlertHandler';

class Orders extends Component {
  state = {
    orders: [1, 2, 3],
    loading: true,
  };

  async componentDidMount() {
    try {
      const res = await axios.get('/orders.json');

      const Orders = [];

      for (let key in res.data) {
        Orders.push({
          ...res.data[key],
          id: key,
        });
      }

      this.setState({ loading: false, orders: Orders });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const order = this.state.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ));

    return <div>{order}</div>;
  }
}

export default withAlertHandler(Orders, axios);
