import React, { useContext, useEffect, useState } from 'react';
import { StateContext, DispatchContext } from 'App';
import apiClient from 'Lib/apiClient';
import { ORDERS_DATA_LOADED, ERROR_OCCURRED } from 'Store';
import PageLoading from 'Components/PageLoading';
import { toPriceString } from 'Lib/utils';

const OrderHistory = () => {
  const [ordersDataLoaded, setOrdersDataLoaded] = useState(false);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (!ordersDataLoaded) {
      apiClient
        .getOrders()
        .then((payload) => {
          dispatch({ type: ORDERS_DATA_LOADED, payload });
          setOrdersDataLoaded(true);
        })
        .catch((e) => dispatch({ type: ERROR_OCCURRED, payload: e.message }));
    }
  }, [ordersDataLoaded, dispatch]);

  return (
    <>
      <h1 className='text-4xl font-bold'>Order History</h1>
      <br />
      {ordersDataLoaded ? <Orders /> : <PageLoading />}
    </>
  );
};

const Orders = () => {
  const state = useContext(StateContext);
  const { orders } = state;

  return <pre>{JSON.stringify(orders, null, 2)}</pre>;
};

export default OrderHistory;
