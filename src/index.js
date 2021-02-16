import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/* 把 Square 组件重写为一个函数组件，如果你想写的组件只包含一个 render 方法，并且不包含 state，那么使用函数组件就会更简单 */
function Square(props) {
  return (
    < button className="square" onClick={props.onClick} >
      { props.value}
    </button >
  );
}

class Board extends React.Component {

  renderSquare(i) {
    /* 现在我们从 Board 组件向 Square 组件中传递两个 props 参数：value 和 onClick。
      onClick prop 是一个 Square 组件点击事件监听函数 */
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    }
  }

  handlerClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    // 注意，我们调用了 .slice() 方法创建了 squares 数组的一个副本，而不是直接在现有的数组上进行修改。
    // 为什么不可变性在 React 中非常重要?  1.简化复杂的功能  2.跟踪数据的改变  3.确定在 React 中何时重新渲染
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext
    })
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handlerClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
ReactDOM.render(
  <React.StrictMode>
    <Game />,
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/* 传入长度为 9 的数组，此函数将判断出获胜者，并根据情况返回 “X”，“O” 或 “null”。 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}