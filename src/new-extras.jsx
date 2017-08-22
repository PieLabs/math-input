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
import { OverrideIconButton, buttonStyle } from './styles';
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

const specialStyle = merge({}, buttonStyle(), {
  root: {
    display: 'block',
  },
  label: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    right: '0px',
    bottom: '0px'

  }
});

const Special = withStyles(createStyleSheet('Special', specialStyle))(OverrideIconButton);

class B extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // this.button.click();
  }

  render() {
    const { className, children } = this.props;

    return <div className={className} onClick={this.onClick}><Special ref={r => this.button = r}>{children}</Special></div>
  }
}


export class Extras extends React.Component {

  render() {
    const { classes } = this.props;
    const rows = chunk(buttons, 4);
    return <div className={classes.root}>
      {buttons.map((b, index) => {
        const Icon = b.icon ? b.icon : 'div';
        return <B key={index} className={classes.holder}><Icon /></B>
      })}
    </div>
  }
}

export default withStyles(
  createStyleSheet('Extras', ({
    root: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridRowGap: '0px',
      gridColumnGap: '0px'
    },
    holder: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: '#cceeff'
    }
  }))
)(Extras);
