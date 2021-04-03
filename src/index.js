import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = ({ highlight, onClick, value }) => {
  return (
    <button
      className={`square ${highlight ? 'is-highlight' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const Board = ({ squares, onClick, highlights }) => {
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

const Game = props => {
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

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  return null;
}
