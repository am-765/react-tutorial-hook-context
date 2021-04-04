import React from 'react';
import { Square } from './Square';

export const Board = ({ squares, onClick, highlights }) => {
  const renderSquare = (i, j = false) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        highlight={j}
        key={i}
      />
    );
  };

  const boardRow = Array(3)
    .fill(0)
    .map((_, i) => (
      <div className='board-row' key={i}>
        {Array(3)
          .fill(0)
          .map((_, j) =>
            renderSquare(i * 3 + j, highlights.indexOf(i * 3 + j) !== -1)
          )}
      </div>
    ));

  return <div>{boardRow}</div>;
};
