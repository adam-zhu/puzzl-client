import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StateContext, DispatchContext } from 'App';
import apiClient from 'Lib/apiClient';
import { ERROR_OCCURRED, ORDER_CONFIRMED } from 'Store';

const StripePromise = loadStripe(
  'pk_test_51Hxe1hB0apBhbVSw1AsqxV4Bhry86QFvzCR0jzF4gDeQreQDe1jKTSTGFyZAmet7upFnm9dS3UmEL5KxRZ8yy74V00pvSuRZaE',
);

const Checkout = () => {
  return (
    <>
      <h1 className='text-4xl font-bold'>Checkout</h1>
      <br />
      <Elements stripe={StripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { cart, snacks, user, errors } = state;
  const items = cart.map((_id) => {
    const snack = snacks.find((s) => s._id === _id);

    return {
      id: snack._id,
      price_cents: snack.price_cents,
    };
  });
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    dispatch({
      type: ERROR_OCCURRED,
      payload: event.error ? event.error.message : '',
    });
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      dispatch({
        type: ERROR_OCCURRED,
        payload: `Payment failed ${payload.error.message}`,
      });
      setProcessing(false);
    } else {
      const order = {
        ...payload,
        items,
      };

      apiClient
        .createOrder({ order, user })
        .then((payload) => {
          dispatch({ type: ORDER_CONFIRMED, payload });
          setProcessing(false);
          setSucceeded(true);
        })
        .catch((e) => dispatch({ type: ERROR_OCCURRED, payload: e.message }));
    }
  };

  useEffect(() => {
    if (!clientSecret) {
      apiClient
        .createPaymentIntent(items)
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((e) => dispatch({ type: ERROR_OCCURRED, payload: e.message }));
    }
  }, [dispatch, items, errors, clientSecret]);

  useEffect(() => {
    if (succeeded) {
      history.push('/order-confirmation');
    }
  }, [succeeded]);

  const cardStyle = {
    style: {
      base: {
        'color': '#32325d',
        'fontFamily': 'Arial, sans-serif',
        'fontSmoothing': 'antialiased',
        'fontSize': '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <form
      id='payment-form'
      onSubmit={handleSubmit}
      style={{ maxWidth: '27rem' }}
    >
      <CardElement
        id='card-element'
        options={cardStyle}
        onChange={handleChange}
      />
      <br />
      <button
        className='bg-green-400 py-2 px-4 rounded-md shadow-md text-white'
        disabled={processing || disabled || succeeded}
        id='submit'
      >
        <span id='button-text'>
          {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
        </span>
      </button>
      {/* Show a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded! Redirecting...
      </p>
    </form>
  );
};

export default Checkout;
