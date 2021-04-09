import React, { useState } from 'react';
import { calculateWinner } from '../calculateWinner';
import { Board } from './Board';
import { Moves } from './Moves';
import styled from 'styled-components';

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

  let status;
  if (result) {
    status = `Winner: ${result.winner}`;
  } else if (stepNumber === 9) {
    status = `Draw`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <Wrapper>
      <div className='game-board'>
        <Board
          squares={currentHistory.squares}
          onClick={i => handleClick(i)}
          highlights={result ? result.line : []}
        />
      </div>
      <Info>
        <Status>{status}</Status>
        <button onClick={() => switchAsc()}>Asc / Desc</button>
        <ol>
          <Moves
            history={history}
            jumpTo={jumpTo}
            stepNumber={stepNumber}
            ascending={ascending}
          />
        </ol>
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Info = styled.div`
  margin-left: 20px;
`;

const Status = styled.div`
  margin-bottom: 10px;
`;

const List = styled.ol`
  padding-left: 30px;
`;
