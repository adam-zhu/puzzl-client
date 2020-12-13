import React from 'react';
import Loading from './Loading';

const PageLoading = () => (
  <div className='flex flex-col justify-around' style={{ minHeight: '69vh' }}>
    <div className='flex justify-around'>
      <span className='inline-flex'>
        <Loading />
      </span>
    </div>
  </div>
);

export default PageLoading;
