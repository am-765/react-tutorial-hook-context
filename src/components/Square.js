import React from 'react';

export const Square = ({ highlight, onClick, value }) => {
  return (
    <button
      className={`square ${highlight ? 'is-highlight' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
