import * as React from 'react';

import { createStyleSheet, withStyles } from 'material-ui/styles';

import Extras from './extras';
import IconButton from 'material-ui/IconButton';
import NumberPad from './number-pad';
import { buttonStyle } from './styles';
import injectSheet from 'react-jss';
import merge from 'lodash/merge';
import BasicOperatorsPad from './basic-operators';
import Left from 'material-ui-icons/KeyboardArrowLeft';
import Right from 'material-ui-icons/KeyboardArrowRight';
import Up from 'material-ui-icons/KeyboardArrowUp';
import Down from 'material-ui-icons/KeyboardArrowDown';
import Backspace from 'material-ui-icons/Backspace';
import Clear from 'material-ui-icons/Clear';

const topRowStyle = merge(buttonStyle(), {
  root: {
    backgroundColor: '#eaeadf',
    marginRight: '0'
  }
});

const Blank = withStyles(
  createStyleSheet('Blank', {
    root: {
      display: 'inline-block',
      backgroundColor: 'white'
    }
  }))(props => <div className={props.classes.root}></div>);

const RawIb = (props) => (
  <IconButton
    {...props}
    classes={
      { root: props.classes.root, label: props.classes.label }
    }>{props.children}</IconButton >);


const Tr = withStyles(createStyleSheet('Tr', theme => topRowStyle))(RawIb);

const cursor = ['Left', 'Right', 'Up', 'Down'];

const icons = {
  Left: Left,
  Right: Right,
  Up: Up,
  Down: Down
}

const TopRow = (props) => (
  <div className={props.className}>
    {cursor.map(c => {
      const Icon = icons[c];
      return <Tr key={c} onClick={() => props.onClick(c)}><Icon /></Tr>
    })}
    <Blank />
    <Blank />
    <Tr
      onClick={() => props.onClick('Backspace')}>    <Backspace />
    </Tr>
    <Tr><Clear onClick={() => props.onClick('clear')} /></Tr>
  </div>
);

export class Keypad extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onNumberPadClick = this.onNumberPadClick.bind(this);
    this.onTopRowClick = this.onTopRowClick.bind(this);
    this.onBasicOperatorsClick = this.onBasicOperatorsClick.bind(this);
    this.onExtrasClick = this.onExtrasClick.bind(this);

  }

  onTopRowClick(value) {
    this.props.onClick({
      value,
      type: 'cursor'
    });
  }

  onNumberPadClick(value) {
    this.props.onClick({
      value
    })
  }

  onBasicOperatorsClick(value) {
    this.props.onClick({
      value
    })
  }

  onExtrasClick(data) {
    this.props.onClick(data);
  }

  render() {
    console.log('[Keypad] render...');
    const { classes } = this.props;

    return <div className={classes.root}>
      <TopRow className={classes.topRow} onClick={this.onTopRowClick} />
      <NumberPad onClick={this.onNumberPadClick} />
      <BasicOperatorsPad onClick={this.onBasicOperatorsClick} />
      <Extras onClick={this.onExtrasClick} />
    </div>;
  }
}


const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr 4fr',
    gridTemplateRows: '1fr 4fr',
    gridColumnGap: '0px'
  },
  topRow: {
    gridColumn: '1/6',
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridRowGap: '0px',
    gridColumnGap: '0px',

  }
}

export default injectSheet(styles)(Keypad);