import React from 'react';

const Info = _ => (
  <div id="innerInfo"><p>Allows to use numbers up to 9 digits long (displays longer calculation
  results in exponential form).</p>
  <p><b>C</b> - clear the last char.</p>
  <p><b>CA</b> - clear the display and current calculation sequence</p>
  <p><b>M</b> - add currently displayed number to memory</p>
  <p><b>M+</b> - add currently displayed number to the number stored in memory</p>
  <p><b>M-</b> - subtract the currently displayed number from the number stored
  in memory</p>
  <p>Attempt to divide by zero will result in an error</p>
  </div>);

  export default Info;
