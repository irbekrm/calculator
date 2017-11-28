import React from 'react';

const Screen = props => {console.log(`current char is ${props.currentChar.length}`);let p; return (<div class="screen">
  <span>{"M: " + props.memory}</span>
  <span>{props.currentChar.length <= 9 ? props.currentChar : (+props.currentChar).toExponential(2)+""}</span>
  <span id="sequence">{(p=props.currentSequence, p.length <= 27) ? p : `...${p.slice(p.length-27)}`}</span>
</div>)};

export default Screen;
