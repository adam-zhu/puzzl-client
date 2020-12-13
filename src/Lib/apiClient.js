const { REACT_APP_API_ENDPOINT } = process.env;

const getSnacks = async () => {
  const endpoint = `${REACT_APP_API_ENDPOINT}/snacks`;
  const result = await fetch(endpoint);
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

const apiClient = { getSnacks, createPaymentIntent };

export default apiClient;
