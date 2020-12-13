const { REACT_APP_API_ENDPOINT } = process.env;

const getSnacks = async () => {
  const endpoint = `${REACT_APP_API_ENDPOINT}/snacks`;
  const result = await fetch(endpoint);
  const data = await result.json();

  return data;
};

const getOrders = async (userId) => {
  const endpoint = `${REACT_APP_API_ENDPOINT}/orders?userId=${userId}`;
  const result = await fetch(endpoint);
  const data = await result.json();

  return data;
};

const createOrder = async ({ order, user }) => {
  const endpoint = `${REACT_APP_API_ENDPOINT}/orders`;
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ order, user }),
  });
  const data = await result.json();

  return data;
};

const createPaymentIntent = async (items) => {
  const endpoint = `${REACT_APP_API_ENDPOINT}/create-payment-intent`;
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });
  const data = await result.json();

  return data;
};

const apiClient = { getSnacks, getOrders, createPaymentIntent, createOrder };

export default apiClient;
