import React, {Component} from 'react';
import Button from './Button.js';
import Screen from './Screen.js';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSequence: "0",
      currentChar: "0",
      result: false,
      memory: "0",
      error: false

    }
  };

  // TODO: refactor to avoid multiple calls to clear etc
  handleClick = (type, name) => {
    let char = this.state.currentChar;
    let sequence = this.state.currentSequence;
    type == "memSave" && /^-?[\d\.\s]*\d$/.test(char)? this.memorySave(char) :
    type == "memCalc" && /^-?[\d\.\s]*\d$/.test(char) ? this.memoryCalc(name,char):

    (this.state.result || this.state.error) && this.clear(),

    ((type == "dot" && /^\d+$/.test(char) ||
    type == "digit") && char.length <= 8) || (type == "op" &&
    ((!isNaN(+char) && sequence !== "0") ||( name == "-" && !/(\s*[-\+\\x]\s*){2,}$/.test(sequence))) && !this.state.result && char[char.length-1] != ".") ?
    this.addChar(name,type) :
    type == "clear" ?
    this.clear():
    type == "clearChar" ?
    this.clearChar() :
    type == "equals" && !isNaN((+char)) && !this.state.result && char[char.length-1] != "." ?
    this.evaluate():
    true
   }

  // TODO: zero division error
  evaluate = _ => {
    let sequence = this.state.currentSequence.replace(/x/g,"*");
    let result = eval(sequence);
    result !== Infinity ?
    this.setState(prevState => ({currentChar:result + "", result: true,
    currentSequence: prevState.currentSequence + ` = ${result}`})):
    this.displayZeroDivisionError();

  }
  displayZeroDivisionError = _ => {
    this.setState(prevState => ({currentChar: "-", currentSequence: "CANNOT DIVIDE BY ZERO", error: true}))
  }

  addChar = (char, type) => {
    let w = type == "op" ? " " : "";
    this.setState(prevState => ({currentSequence:
      char != "." && prevState.currentChar == "0" ?
      prevState.currentSequence.replace(/0\s?$/,char): prevState.currentSequence + w + char + w,
      currentChar :
      (!(isNaN(+prevState.currentChar)) || prevState.currentChar[prevState.currentChar.length-1] == ".") &&
      (!(isNaN(+char)) || char == ".") &&
      (prevState.currentChar !== "0" || char == ".") ?
      prevState.currentChar + char :
      char
    }))};
  clear = _ => this.setState({currentSequence: "0", currentChar: "0",
    result: false, error: false});

  clearChar = _ => this.setState(prevState => ({currentChar: prevState.currentChar.replace(/\S\s*$/,"")||"0",
  currentSequence: prevState.currentSequence.replace(/\S\s*$/,"")||"0"}));

  memoryCalc = (name, char) => {

    let result = eval(this.state.memory + name[1] + char);

    this.setState(prevState => ({
      currentSequence:prevState.memory + name[1] + char +"=" + result,
      currentChar: result+"",
      result: true
    }))
  }

  memorySave = char => {
     this.setState({memory: char})
  };

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
      <div class="calculator">
        <Screen memory={this.state.memory}
          currentSequence={this.state.currentSequence}
          currentChar={this.state.currentChar}/>
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
      </div>
    )
  }
};

export default Calculator;
