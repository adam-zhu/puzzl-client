import React, { useContext, useEffect, useState } from 'react';
import { StateContext, DispatchContext } from 'App';
import apiClient from 'Lib/apiClient';
import { SNACKS_DATA_LOADED, ERROR_OCCURRED, ITEM_ADDED } from 'Store';
import PageLoading from 'Components/PageLoading';
import { toPriceString } from 'Lib/utils';

const Home = () => {
  const [snacksDataLoaded, setSnacksDataLoaded] = useState(false);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (!snacksDataLoaded) {
      apiClient
        .getSnacks()
        .then((payload) => {
          dispatch({ type: SNACKS_DATA_LOADED, payload });
          setSnacksDataLoaded(true);
        })
        .catch((e) => dispatch({ type: ERROR_OCCURRED, payload: e.message }));
    }
  }, [snacksDataLoaded, dispatch]);

  return (
    <>
      <h1 className='text-4xl font-bold'>Snacks</h1>
      <br />
      {snacksDataLoaded ? <Snacks /> : <PageLoading />}
    </>
  );
};

const Snacks = () => {
  const state = useContext(StateContext);
  const { snacks } = state;

  return snacks.map(Snack);
};

const Snack = ({ _id, name, image, price_cents }) => {
  const dispatch = useContext(DispatchContext);
  const addItemToCart = () => dispatch({ type: ITEM_ADDED, payload: _id });

  return (
    <div key={_id} className='mr-4 mb-4 p-4 bg-white inline-block'>
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
        <br />
        <button
          className='bg-green-400 py-2 px-4 rounded-md shadow-md text-white'
          onClick={addItemToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Home;
