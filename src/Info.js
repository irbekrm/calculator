import React from 'react';

const Info = _ => (
  <div id="innerInfo"><p>Perform calculations with numbers up to 9 digits long
   (If the result of a calculation is longer than 9 digits, it will be
   displayed in an exponential form)</p>
  <p><b>C</b> - clear the last character or in an ongoing calculation sequence
  or clear the displayed value and calculation sequence if the sequence
  has already been evaluated</p>
  <p><b>CA</b> - clear the display and the current calculation sequence</p>
  <p><b>M</b> - replace the value stored in memory by the currently displayed
   value. Memory value is 0 by default</p>
  <p><b>M+</b> - add currently the displayed value to the value stored in memory</p>
  <p><b>M-</b> - subtract the currently displayed value from the value stored
  in memory</p>
  <p>Attempt to divide by zero will result in an error</p>
  </div>);

  export default Info;
