import React from 'react';

const Screen = props => (<div class="screen">
  <p>{"M: " + props.memory}</p>
  <p>{props.currentChar}</p>
  <p>{props.currentSequence}</p>
</div>);

export default Screen;
