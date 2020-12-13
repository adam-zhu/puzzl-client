import { render } from '@testing-library/react';
import App from '../App';

const testUser = {
  email: 'adam@adamzhu.co',
  email_verified: true,
  family_name: 'Zhu',
  given_name: 'Adam',
  locale: 'en',
  name: 'Adam Zhu',
  nickname: 'adam',
  picture:
    'https://lh3.googleusercontent.com/a-/AOh14Ghz1bjxC4Oy8ItgY51PqovayzJn23SG28qoIykiJA=s96-c',
  sub: 'google-oauth2|101808654973584632667',
  updated_at: '2020-12-12T17:54:05.765Z',
};
test('renders without crashing', () => {
  window.crypto = jest.mock();

  expect(() => render(<App user={testUser} />)).not.toThrow();
});
