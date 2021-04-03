import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className={`square ${props.highlight ? 'is-highlight' : ''}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, j = false) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        highlight={j}
        key={i}
      />
    );
  }

  render() {
    const boardRow = Array(3)
      .fill(0)
      .map((_, i) => (
        <div className='board-row' key={i}>
          {Array(3)
            .fill(0)
            .map((_, j) =>
              this.renderSquare(
                i * 3 + j,
                this.props.highlights.indexOf(i * 3 + j) !== -1
              )
            )}
        </div>
      ));
    return <div>{boardRow}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          col: 0,
          row: 0
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      ascending: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
          col: (i % 3) + 1,
          row: Math.floor(i / 3) + 1
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  switchAsc() {
    this.setState({
      ascending: !this.state.ascending
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const isActive = this.state.stepNumber === move ? 'is-active' : '';
      const desc = move
        ? `Go to move #${move} (${step.col}, ${step.row})`
        : 'Go to move start';
      return (
        <li key={move}>
          <button className={isActive} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (result) {
      status = `Winner: ${result.winner}`;
    } else if (this.state.stepNumber === 9) {
      status = `Draw`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            highlights={result ? result.line : []}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <button onClick={() => this.switchAsc()}>Asc / Desc</button>
          <ol>{this.state.ascending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

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
