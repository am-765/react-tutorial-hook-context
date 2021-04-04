import React, { useState } from 'react';
import { calculateWinner } from '../calculateWinner';
import { Board } from './Board';

export const Game = props => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), col: 0, row: 0 }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascending, setAscending] = useState(true);

  const handleClick = i => {
    const getHistory = history.slice(0, stepNumber + 1);
    const current = getHistory[getHistory.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([
      ...getHistory,
      { squares, col: (i % 3) + 1, row: Math.floor(i / 3) + 1 }
    ]);
    setStepNumber(getHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const switchAsc = () => {
    setAscending(!ascending);
  };

  const currentHistory = history[stepNumber];
  const result = calculateWinner(currentHistory.squares);

  const moves = history.map((step, move) => {
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

  let status;
  if (result) {
    status = `Winner: ${result.winner}`;
  } else if (stepNumber === 9) {
    status = `Draw`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          squares={currentHistory.squares}
          onClick={i => handleClick(i)}
          highlights={result ? result.line : []}
        />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <button onClick={() => switchAsc()}>Asc / Desc</button>
        <ol>{ascending ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
};
