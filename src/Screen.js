import React from 'react';

const Screen = props => (<div class="screen">
  <p>{"M: " + props.memory}</p>
  <p>{props.currentSequence}</p>
  <p>{props.currentChar}</p>
</div>);

export default Screen;
