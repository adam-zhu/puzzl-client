import React, { useContext } from 'react';
import { StateContext, DispatchContext } from 'App';
import { ERRORS_DISMISSED } from 'Store';

const Errors = () => {
  const { errors } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return errors.length ? (
    <ul className='p-8 bg-red-400'>
      {errors.map((e, i) => (
        <pre key={`${i}${e.message}`} className='text-white'>
          {e}
        </pre>
      ))}
      <br />
      <button
        className='bg-white py-2 px-4 rounded-md shadow-md text-red-400'
        onClick={() => dispatch({ type: ERRORS_DISMISSED })}
      >
        Dismiss
      </button>
    </ul>
  ) : null;
};

export default Errors;
