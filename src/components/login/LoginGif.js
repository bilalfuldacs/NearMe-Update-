import React from 'react';
import loadingGif from '../../assets/login.gif';

function Loading() {
  return (
    <>

      <img src={loadingGif} alt="Loading..." style={{height:'350px'}} />
    </>
  );
}

export default Loading;
