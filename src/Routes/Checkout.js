import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StateContext, DispatchContext } from 'App';
import apiClient from 'Lib/apiClient';
import { ERROR_OCCURRED } from 'Store';

const StripePromise = loadStripe(
  'pk_test_51Hxe1hB0apBhbVSw1AsqxV4Bhry86QFvzCR0jzF4gDeQreQDe1jKTSTGFyZAmet7upFnm9dS3UmEL5KxRZ8yy74V00pvSuRZaE',
);

const Checkout = () => {
  return (
    <Elements stripe={StripePromise}>
      <div>
        <CheckoutForm />
      </div>
    </Elements>
  );
};

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { cart, snacks } = state;
  const items = cart.map((_id) => {
    const snack = snacks.find((s) => s._id === _id);

    return {
      id: snack._id,
      price_cents: snack.price_cents,
    };
  });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    apiClient
      .createPaymentIntent(items)
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((e) => dispatch({ type: ERROR_OCCURRED, payload: e.message }));
  }, []);

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
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    console.log({ payload });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <CardElement
        id='card-element'
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id='submit'>
        <span id='button-text'>
          {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {' '}
          Stripe dashboard.
        </a>{' '}
        Refresh the page to pay again.
      </p>
    </form>
  );
};

export default Checkout;
