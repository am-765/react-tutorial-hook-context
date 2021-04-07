import React from 'react';

export const Moves = ({ history, stepNumber, jumpTo }) => {
  return history.map((step, move) => {
    const isActive = stepNumber === move ? 'is-active' : '';
    const desc = move
      ? `Go to move #${move} (${step.col}, ${step.row})`
      : 'Go to move start';
    return (
      <li key={move}>
        <button className={isActive} onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });
};
