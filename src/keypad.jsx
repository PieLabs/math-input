import * as React from 'react';

import { createStyleSheet, withStyles } from 'material-ui/styles';

import Clear from 'material-ui-icons/Clear';
import DeleteIcon from 'material-ui-icons/Delete';
import Down from 'material-ui-icons/KeyboardArrowDown';
import Extras from './extras';
import IconButton from 'material-ui/IconButton';
import Left from 'material-ui-icons/KeyboardArrowLeft';
import Right from 'material-ui-icons/KeyboardArrowRight';
import Up from 'material-ui-icons/KeyboardArrowUp';
import { button as baseStyle } from './styles';
import injectSheet from 'react-jss';
import merge from 'lodash/merge';

const topRowStyle = merge({}, baseStyle, {
  root: {
    backgroundColor: '#eaeadf'
  }
});

const Blank = withStyles(
  createStyleSheet('Blank', { root: { display: 'inline-block', width: '50px', height: '50px', backgroundColor: 'white' } }))(props => <div className={props.classes.root}></div>);

const RawIb = (props) => (
  <IconButton classes={
    { root: props.classes.root, label: props.classes.label }
  }>{props.children}</IconButton >);


const Ib = withStyles(createStyleSheet('Ib', theme => baseStyle))(RawIb);
const Tr = withStyles(createStyleSheet('Tr', theme => topRowStyle))(RawIb);
const Special = withStyles(createStyleSheet('Special', theme => specialStyle))(RawIb);

const TopRow = (props) => (<div>
  <Tr><Left /></Tr>
  <Tr><Right /></Tr>
  <Tr><Up /></Tr>
  <Tr><Down /></Tr>
  <Blank />
  <Tr><DeleteIcon /></Tr>
  <Tr><Clear /></Tr>
</div>
);

const Number = (props) => (
  <Ib>{props.children}</Ib>
);


const Numbers = (props) => (
  <div>
    <div>
      <Number>7</Number>
      <Number>8</Number>
      <Number>9</Number>
    </div>
    <div>
      <Number>4</Number>
      <Number>5</Number>
      <Number>6</Number>
    </div>
    <div>
      <Number>1</Number>
      <Number>2</Number>
      <Number>3</Number>
    </div>
    <div>
      <Number>0</Number>
      <Number>.</Number>
      <Number>=</Number>
    </div>
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


export class Keypad extends React.Component {

  render() {
    return <div>
      <TopRow />
      <MiddleRow />
    </div>;
  }
}


const styles = {

}

export default injectSheet(styles)(Keypad);