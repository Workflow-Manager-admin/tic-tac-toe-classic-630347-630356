import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <button 
      className={`square ${value ? 'filled' : ''}`} 
      onClick={onClick}
      disabled={value !== null}
    >
      {value}
    </button>
  );
};

export default Square;
