import React from 'react';

const Screen = props => (<div class="screen">
  <span>{"M: " + props.memory}</span>
  <span>{props.currentChar}</span>
  <span>{props.currentSequence}</span>
</div>);

export default Screen;
