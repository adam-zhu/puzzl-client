import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { StateContext, DispatchContext } from 'App';
import { ITEM_REMOVED } from 'Store';
import { toPriceString } from 'Lib/utils';

const Cart = () => {
  const state = useContext(StateContext);
  const { cart, snacks } = state;
  const items = cart.map((_id) => snacks.find((s) => s._id === _id));
  const history = useHistory();

  return (
    <>
      <h1 className='text-4xl font-bold'>Cart</h1>
      <br />
      {items.length ? (
        <>
          {items.map(Item)}
          <br />
          <br />
          <button
            className='bg-green-400 py-2 px-4 rounded-md shadow-md text-white'
            onClick={() => history.push('/checkout')}
          >
            Checkout
          </button>
        </>
      ) : (
        <em>Cart is empty.</em>
      )}
    </>
  );
};

const Item = ({ _id, name, image, price_cents }, index) => {
  const dispatch = useContext(DispatchContext);
  const removeItemFromCart = () =>
    dispatch({ type: ITEM_REMOVED, payload: index });

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
        <br />
        <button
          className='bg-red-400 py-2 px-4 rounded-md shadow-md text-white'
          onClick={removeItemFromCart}
        >
          Remove from cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
