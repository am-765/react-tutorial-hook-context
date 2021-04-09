import React from 'react';
import styled from 'styled-components';

export const Moves = ({ history, stepNumber, jumpTo, ascending }) => {
  const moveItem = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${step.col}, ${step.row})`
      : 'Go to move start';
    return (
      <li key={move}>
        <Button isActive={stepNumber === move} onClick={() => jumpTo(move)}>
          {desc}
        </Button>
      </li>
    );
  });
  return ascending ? moveItem : moveItem.reverse();
};

const Button = styled.button`
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
`;
