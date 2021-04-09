import React from 'react';
import styled from 'styled-components';

export const Square = ({ highlight, onClick, value }) => {
  return (
    <Button isActive={highlight} onClick={onClick}>
      {value}
    </Button>
  );
};

const Button = styled.button`
  background: ${props => (props.isActive ? 'yellow' : 'white')};
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
  &:focus {
    outline: none;
  }
`;
