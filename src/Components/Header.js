import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from 'App';

const Header = ({ user, logoutHandler }) => {
  return (
    <header className='flex justify-between items-center p-4 shadow-md'>
      <Nav />
      <Auth user={user} logoutHandler={logoutHandler} />
    </header>
  );
};

const Nav = () => {
  const state = useContext(StateContext);
  const { cart } = state;

  return (
    <nav>
      <ul className='flex space-x-4'>
        <li className='text-blue-400 underline'>
          <Link to='/'>Home</Link>
        </li>
        <li className='text-blue-400 underline'>
          <Link to='/cart'>Cart{` (${cart.length})`}</Link>
        </li>
        <li className='text-blue-400 underline'>
          <Link to='/order-history'>Order History</Link>
        </li>
      </ul>
    </nav>
  );
};

const Auth = ({ logoutHandler }) => {
  const state = useContext(StateContext);
  const { user } = state;

  return (
    <div className='text-right'>
      <strong>{user?.email}</strong>
      <button
        className='bg-blue-400 py-2 px-4 rounded-md shadow-md text-white ml-4'
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
