import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'Routes/Home';
import Cart from 'Routes/Cart';
import Checkout from 'Routes/Checkout';
import OrderConfirmation from 'Routes/OrderConfirmation';
import OrderHistory from 'Routes/OrderHistory';

const Routes = () => {
  return (
    <Switch>
      <Route path='/cart'>
        <Cart />
      </Route>
      <Route path='/checkout'>
        <Checkout />
      </Route>
      <Route path='/order-confirmation'>
        <OrderConfirmation />
      </Route>
      <Route path='/order-history'>
        <OrderHistory />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
