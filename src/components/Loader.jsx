import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="loader-container">
      <PacmanLoader color="#007bff" size={25} />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
