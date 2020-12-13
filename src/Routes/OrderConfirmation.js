import React, { useContext } from 'react';
import { StateContext } from 'App';
import { toPriceString } from 'Lib/utils';

const OrderConfirmation = () => {
  const state = useContext(StateContext);
  const { snacks, confirmed } = state;
  const itemsData = confirmed.items.map((item) => ({
    ...snacks.find((s) => s._id === item.id),
    ...item,
  }));

  return (
    <div className='mr-4 mb-4 p-4 bg-white shadow-md'>
      <h1 className='text-4xl font-bold'>Order Confirmed</h1>
      <br />
      <em>
        {new Date(confirmed.paymentIntent.created * 1000).toLocaleString()}
      </em>
      <br />
      <span>
        total: <strong>{toPriceString(confirmed.paymentIntent.amount)}</strong>
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

export default OrderConfirmation;
