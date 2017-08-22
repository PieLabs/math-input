import * as React from 'react';

import { createStyleSheet, withStyles } from 'material-ui/styles';

import Clear from 'material-ui-icons/Clear';
import DeleteIcon from 'material-ui-icons/Delete';
import Backspace from 'material-ui-icons/Backspace';
import Down from 'material-ui-icons/KeyboardArrowDown';
import Extras from './new-extras';
import IconButton from 'material-ui/IconButton';
import Left from 'material-ui-icons/KeyboardArrowLeft';
import NumberPad from './number-pad';
import Right from 'material-ui-icons/KeyboardArrowRight';
import Up from 'material-ui-icons/KeyboardArrowUp';
import { buttonStyle } from './styles';
import injectSheet from 'react-jss';
import merge from 'lodash/merge';
import BasicOperatorsPad from './basic-operators';


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
  <IconButton classes={
    { root: props.classes.root, label: props.classes.label }
  }>{props.children}</IconButton >);


const Ib = withStyles(createStyleSheet('Ib', theme => baseStyle))(RawIb);
const Tr = withStyles(createStyleSheet('Tr', theme => topRowStyle))(RawIb);
const Special = withStyles(createStyleSheet('Special', theme => specialStyle))(RawIb);

const cursor = ['left', 'right', 'up', 'down'];
const icons = {
  left: Left,
  right: Right,
  up: Up,
  down: Down
}

const TopRow = (props) => (
  <div className={props.className}>
    {cursor.map(c => {
      const Icon = icons[c];
      return <Tr key={c} onClick={() => props.onClick(c)}><Icon /></Tr>
    })}
    <Blank />
    <Blank />
    <Tr><Backspace /></Tr>
    <Tr><Clear /></Tr>
  </div>
);


const RawMiddleRow = ({ classes }) => (
  <div className={classes.row}>
    <Numbers />
    <Extras />
  </div>
)

const middleRowStyles = createStyleSheet('MiddleRow', theme => ({
  row: {
    display: 'flex'
  }
}));

const MiddleRow = withStyles(middleRowStyles)(RawMiddleRow);


export class Keypad extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onNumberPadClick = this.onNumberPadClick.bind(this);
  }

  onNumberPadClick(value) {
    this.props.onClick({
      value
    })
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