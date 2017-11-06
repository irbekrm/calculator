import React, {Component} from 'react';
import Button from './Button.js';
import Screen from './Screen.js';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSequence: "0",
      currentChar: "0",
      result: false

    }
  };

  // TODO: refactor to avoid multiple calls to clear etc
  handleClick = (type, name) => {

    let char = this.state.currentChar;
    this.state.result && this.clear();
    type == "dot" && char != "." ||
    type == "digit" || type == "op" &&
    Number.isInteger(+char) ?
    this.addChar(name,type) :
    type == "clear" ?
    this.clear():
    type == "equals" ?
    this.evaluate():
    true
   }

  // TODO: zero division error
  evaluate = _ => {
    let sequence = this.state.currentSequence.replace(/x/g,"*");
    let result = eval(sequence);
    this.setState(prevState => ({currentChar:result, result: true,
    currentSequence: prevState.currentSequence + ` = ${result}`}));

  }

  addChar = (char, type) => {
    let w = type == "op" ? " " : "";
    this.setState(prevState => ({currentSequence:
      char != "." && prevState.currentSequence == "0" ?
      char: prevState.currentSequence + w + char + w, currentChar:char}))
  }

  clear = _ => this.setState({currentSequence: "0", currentChar: "0",
    result: false});

  render() {

    let row1 = [["clear", "C"], ["digit","8"], ["digit","9"], ["op", "/"],
      ["mem", "M"]],
      row2 = [["digit", "5"], ["digit","6"],["digit","7"],["mem","x"],
      ["op","M+"]],
      row3 = [["digit","2"],["digit","3"],["digit","4"],["op","-"],
      ["mem","M-"]],
      row4 = [["digit","0"],["digit","1"],["dot","."],["op","+"],
      ["equals","="]];

    let makeRow = arr => arr.map(e => ( <button onClick={ () =>
      this.handleClick(e[0], e[1])}> {e[1]} </button>));

    return (
      <div class="calculator">
        <Screen currentSequence={this.state.currentSequence}
          currentChar={this.state.currentChar}/>
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
