import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

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

ReactDOM.render(
  <React.StrictMode>
    <App user={testUser} />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
