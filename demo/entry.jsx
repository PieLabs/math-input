import MathInput from '../src';
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
  const e = React.createElement(MathInput, {});
  ReactDOM.render(e, document.querySelector('#app'));
});