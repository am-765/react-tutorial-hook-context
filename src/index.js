import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Game } from './components/Game';

const GlobalStyle = createGlobalStyle`
  body {
    font: 14px "Century Gothic", Futura, sans-serif;
    margin: 20px;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <Game />
  </>,
  document.getElementById('root')
);
