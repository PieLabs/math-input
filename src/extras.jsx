import {
  AbsoluteValue,
  Approx,
  Degree,
  Fraction,
  GreaterThan,
  GreaterThanEqual,
  LessThan,
  LessThanEqual,
  NthRoot,
  Parenthesis,
  Percent,
  SquareRoot,
  Subscript,
  Superscript,
  X,
  Y
} from './icons';
import { OverrideIconButton, button as buttonStyle } from './styles';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import React from 'react';
import chunk from 'lodash/chunk';
import merge from 'lodash/merge';

// Subscript/Superscript section
const subscript = { name: 'Subscript', icon: Subscript, symbol: 'x_n', logic: 'cmd', command: '_', shortcut: '', category: 'sub-sup' }; //<sub>n</sub>
const superscript = { name: 'Superscript', icon: Superscript, symbol: 'x^n', logic: 'cmd', command: '^', shortcut: '', category: 'sub-sup' };//<sup>n</sup>
const fraction = { name: 'Fraction', icon: Fraction, symbol: 'x/n', logic: 'cmd', command: '\\frac', shortcut: '', category: 'fraction' };
const percentage = { name: 'Percentage', icon: Percent, symbol: '%', logic: 'cmd', command: '%', shortcut: '', category: 'misc' };
const sqrt = { name: 'Square root', icon: SquareRoot, symbol: '&#870', logic: 'cmd', command: '\\sqrt', shortcut: '', category: 'root' };
const root = { name: 'Nth root', icon: NthRoot, symbol: 'n&#830', logic: 'write', command: '\\sqrt[{}]{}', shortcut: '', category: 'root' };
const absoluteValue = { name: 'Absolute Value', icon: AbsoluteValue, symbol: '| |', logic: 'cmd', command: '|', shortcut: '', category: 'misc' };
const parenthesis = { name: 'Parenthesis', icon: Parenthesis, symbol: '( )', logic: 'cmd', command: '(', shortcut: '', category: 'misc' };
const lt = { name: 'Less than', icon: LessThan, symbol: '<', logic: 'cmd', command: '<', shortcut: '', category: 'comparison' };
const gt = { name: 'Greater than', icon: GreaterThan, symbol: '>', logic: 'cmd', command: '>', shortcut: '', category: 'comparison' };
const degree = { name: 'Degree', icon: Degree, symbol: '°', logic: 'cmd', command: '°', shortcut: '', category: 'misc' };
const approx = { name: 'Approx', icon: Approx, symbol: '&asyp;', logic: 'write', command: '\\approx', shortcut: '', category: 'number' };
const le = { name: 'Less than or equal', icon: LessThanEqual, symbol: '<=', logic: 'cmd', command: '\\le', shortcut: '', category: 'comparison' };
const ge = { name: 'Greater than or equal', icon: GreaterThanEqual, symbol: '>=', logic: 'cmd', command: '\\ge', shortcut: '', category: 'comparison' };
const x = { name: 'X', icon: X, symbol: 'x', logic: 'cmd', command: 'x', shortcut: '', category: 'vars' }; //<sub>n</sub>
const y = { name: 'Y', icon: Y, symbol: 'y', logic: 'cmd', command: 'y', shortcut: '', category: 'vars' };//<sup>n</sup>

const buttons = [
  superscript, subscript, fraction, percentage,
  sqrt, root, absoluteValue, parenthesis,
  lt, gt, degree, approx,
  le, ge, x, y
];

const specialStyle = merge({}, buttonStyle, {
  root: {
    backgroundColor: '#cceeff'
  }
});

const Special = withStyles(createStyleSheet('Special', theme => specialStyle))(OverrideIconButton);

class Row extends React.Component {
  render() {
    return <div>{this.props.buttons.map((b, index) => {
      const Icon = b.icon ? b.icon : 'div';
      return <Special key={index}><Icon /></Special>
    })}</div>
  }
}

export default class Extras extends React.Component {

  render() {
    const rows = chunk(buttons, 4);
    return <div>
      {rows.map((b, index) => <Row key={index} buttons={b} />)}
    </div>
  }
}
