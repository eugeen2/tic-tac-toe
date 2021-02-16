import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 因为 Square 组件不再持有 state，因此每次它们被点击的时候，Square 组件就会从 Board 组件中接收值，并且通知 Board 组件。
// 在 React 术语中，我们把目前的 Square 组件称做“受控组件”。在这种情况下，Board 组件完全控制了 Square 组件。
class Square extends React.Component {

  /** tips:
  在 JavaScript class 中，每次你定义其子类的构造函数时，都需要调用 super 方法。
  因此，在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头。 */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      /* 在 Square 组件 render 方法中的 onClick 事件监听函数中调用 this.setState，
      我们就可以在每次 <button> 被点击的时候通知 React 去重新渲染 Square 组件。 */
      // <button className="square" onClick={function () { alert('click'); }}
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    }
  }

  handlerClick(i) {
    // 注意，我们调用了 .slice() 方法创建了 squares 数组的一个副本，而不是直接在现有的数组上进行修改。
    // 为什么不可变性在 React 中非常重要?  1.简化复杂的功能  2.跟踪数据的改变  3.确定在 React 中何时重新渲染
    const squares = this.state.squares.slice();
    console.log(squares);
    squares[i] = 'X';
    this.setState({ squares: squares });
  }


  renderSquare(i) {
    /* 现在我们从 Board 组件向 Square 组件中传递两个 props 参数：value 和 onClick。
      onClick prop 是一个 Square 组件点击事件监听函数 */
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handlerClick(i)}
    />
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
