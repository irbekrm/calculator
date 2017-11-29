import React, {Component} from 'react';
import Button from './Button.js';
import Screen from './Screen.js';
import Info from './Info.js';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSequence: "0",
      result: false,
      memory: "0",
      error: false
    }
  };

  getCurrentChar = _ => this.state.currentSequence.match(/\S+\s*$/)[0];

  isNumber = x => /^-?[\d\.\s]*\d$/.test(x);

  handleClick = (type, name) => {

    let char = this.getCurrentChar();
    let sequence = this.state.currentSequence;

    type == "memSave" && this.isNumber(char) ? this.memorySave(char) :
    type == "memCalc" && this.isNumber(char) ? this.memoryCalc(name,char) :

    (this.state.result || this.state.error || type == "clear") ?
    this.clear() :

    (type == "dot" && /^-?\d+$/.test(char) && char.length <= 7) ||
    type == "digit" && char.length <= 8 ||
    (type == "op" &&
    (this.isNumber(char) ||
    (name == "-" && !/(\s*[-\+\\x]\s*){2,}$/.test(sequence)))
    && char[char.length-1] != ".") ?
    this.addChar(name,type) :

    type == "clearChar" ?
    this.clearChar() :

    type == "equals" && this.isNumber(char) ?
    this.evaluate():

    true;
   }

  evaluate = _ => {

    let sequence = this.state.currentSequence.replace(/x/g,"*");
    let result = `${eval(sequence)}`;

    /-?\d+/.test(result) ?
    this.setState(prevState => ({result: true,
    currentSequence: `${prevState.currentSequence} = ${result}`})):
    this.displayZeroDivisionError();
  }

  displayZeroDivisionError = _ => {
    this.setState(prevState => ({currentSequence: "CANNOT DIVIDE BY ZERO", error: true}))
  }

  addChar = (char, type) => {

    let currChar = this.getCurrentChar();
    let currentSequence = this.state.currentSequence;
    let w = ((type == "digit" || type == "dot") && (/\d|\./.test(currChar))) ||
    /[-x+/]\s*-$/.test(currentSequence) ? "" : " ";

    this.setState(prevState => ({currentSequence:
      /\d/.test(char) && /^0+$/.test(currChar) ?
      prevState.currentSequence.replace(/0\s?$/,char): `${prevState.currentSequence}${w}${char}`}))
    };

  clear = _ => this.setState({currentSequence: "0",
    result: false, error: false});

  clearChar = _ => this.setState(prevState => ({
  currentSequence: prevState.currentSequence.replace(/\S\s*$/,"")||"0"}));

  memoryCalc = (name, char) => {
    let result = eval(`${this.state.memory} ${name[1]} ${char}`);
    this.setState(prevState => ({
      currentSequence: `${prevState.memory} ${name[1]} ${char} = ${result}`,
      result: true }))
  }

  memorySave = char => {
   this.setState({memory: char})
  }

  render() {
    let row1 = [["op","+"],["clearChar","C"],["clear","CA"]],
      row2 = [["op","/"],["digit","7"],["digit","8"],["digit","9"],
      ["memSave","M"]],
      row3 = [["op","x"],["digit","4"],["digit","5"],["digit","6"],
      ["memCalc","M+"]],
      row4 = [["op","-"],["digit","1"],["digit","2"],["digit","3"],
      ["memCalc","M-"]],
      row5 = [["dot","."],["digit","0"],["equals","="]];

    let makeRow = arr => arr.map(e => ( <button onClick={ () =>
      this.handleClick(e[0], e[1])}>{e[1]}</button>));

    return (
      <div class="wrapper">
      <div id="header">CALCULATOR</div>
      <div id="main">
      <div class="calculator">
        <Screen memory={this.state.memory}
          currentSequence={this.state.currentSequence}
          currentChar={this.state.error ? "-" : this.getCurrentChar()}/>
        <div class="row" id ="row1">
          {makeRow(row1)}
        </div>
        <div class="row" id="row2">
          {makeRow(row2)}
        </div>
        <div class="row" id="row3">
          {makeRow(row3)}
        </div>
        <div class="row" id="row4">
          {makeRow(row4)}
        </div>
        <div class="row" id="row5">
          {makeRow(row5)}
        </div>
      </div>
      <div id="info"><Info/></div>
      </div>
      </div>
    )
  }
};

export default Calculator;
