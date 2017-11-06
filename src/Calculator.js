import React, {Component} from 'react';
import Button from './Button.js';
import Screen from './Screen.js';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChar: 0,
      currentOperation: null,
    }
  };

  handleClick = (type, name) => {

  }

  render() {

    let row1 = [["clear", "C"], ["digit","8"], ["digit","9"], ["op", "/"],
      ["op", "M"]],
      row2 = [["digit", "5"], ["digit","6"],["digit","7"],["op","X"],
      ["op","M+"]],
      row3 = [["digit","2"],["digit","3"],["digit","4"],["op","-"],
      ["op","M-"]],
      row4 = [["digit","0"],["digit","1"],["dot","."],["op","+"],
      ["equals","="]];

    let makeRow = arr => arr.map(e => ( <button onClick={ () =>
      this.handleClick(e[0], e[1])}> {e[1]} </button>));

    return (
      <div class="calculator">
        <Screen currentNumber={this.state.currentChar}/>
        <div class="row">
          {makeRow(row1)}
        </div>
        <div class="row">
          {makeRow(row2)}
        </div>
        <div class="row">
          {makeRow(row3)}
        </div>
        <div class="row">
          {makeRow(row4)}
        </div>

      </div>
    )
  }
};

export default Calculator;
