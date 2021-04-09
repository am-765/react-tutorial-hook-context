import React from 'react';
import { Square } from './Square';
import styled from 'styled-components';

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
      <BoardRow key={i}>
        {Array(3)
          .fill(0)
          .map((_, j) =>
            renderSquare(i * 3 + j, highlights.indexOf(i * 3 + j) !== -1)
          )}
      </BoardRow>
    ));

  return <div>{boardRow}</div>;
};

const BoardRow = styled.div`
  &:after {
    clear: both;
    content: '';
    display: table;
  }
`;
