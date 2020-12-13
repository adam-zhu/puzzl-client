import React, { useContext, useEffect, useState } from 'react';
import { StateContext, DispatchContext } from 'App';
import apiClient from 'Lib/apiClient';
import { ORDERS_DATA_LOADED, SNACKS_DATA_LOADED, ERROR_OCCURRED } from 'Store';
import PageLoading from 'Components/PageLoading';
import { toPriceString } from 'Lib/utils';

const OrderHistory = () => {
  const [ordersDataLoaded, setOrdersDataLoaded] = useState(false);
  const [snacksDataLoaded, setSnacksDataLoaded] = useState(false);
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { user, orders, snacks } = state;

  useEffect(() => {
    if (!snacks && !snacksDataLoaded) {
      apiClient
        .getSnacks()
        .then((payload) => {
          dispatch({ type: SNACKS_DATA_LOADED, payload });
          setSnacksDataLoaded(true);
        })
        .catch((e) => dispatch({ type: ERROR_OCCURRED, payload: e.message }));
    }
  }, [snacksDataLoaded, dispatch, snacks]);

  useEffect(() => {
    if (!orders && !ordersDataLoaded) {
      apiClient
        .getOrders(user.sub)
        .then((payload) => {
          dispatch({ type: ORDERS_DATA_LOADED, payload });
          setOrdersDataLoaded(true);
        })
        .catch((e) => dispatch({ type: ERROR_OCCURRED, payload: e.message }));
    }
  }, [ordersDataLoaded, dispatch, orders, user.sub]);

  return (
    <>
      <h1 className='text-4xl font-bold'>Order History</h1>
      <br />
      {(ordersDataLoaded || orders) && (snacksDataLoaded || snacks) ? (
        orders.map(Order)
      ) : (
        <PageLoading />
      )}
    </>
  );
};

const Order = ({ _id, paymentIntent, items }) => {
  const state = useContext(StateContext);
  const { snacks } = state;
  const itemsData = items.map((item) => ({
    ...snacks.find((s) => s._id === item.id),
    ...item,
  }));
  return (
    <div key={`${_id}`} className='mr-4 mb-4 p-4 bg-white shadow-md'>
      <em>{new Date(paymentIntent.created * 1000).toLocaleString()}</em>
      <br />
      <span>
        total: <strong>{toPriceString(paymentIntent.amount)}</strong>
      </span>
      <br />
      {itemsData.map(Item)}
    </div>
  );
};

const Item = ({ _id, name, image, price_cents }, index) => {
  return (
    <div key={`${_id}${index}`} className='mr-4 mb-4 p-4 bg-white inline-block'>
      <img
        style={{
          width: '6rem',
          height: '6rem',
          display: 'inline-block',
          verticalAlign: 'middle',
        }}
        src={image}
        alt={name}
      />
      <div className='inline-block align-middle'>
        <strong>{name}</strong>
        <br />
        <span>{toPriceString(price_cents)}</span>
      </div>
    </div>
  );
};

export default OrderHistory;
