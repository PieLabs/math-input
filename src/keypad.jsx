import * as React from 'react';

import { createStyleSheet, withStyles } from 'material-ui/styles';

import Backspace from 'material-ui-icons/Backspace';
import BasicOperatorsPad from './basic-operators';
import Clear from 'material-ui-icons/Clear';
import Code from 'material-ui-icons/Code';
import CodeEditor from './code-editor';
import Down from 'material-ui-icons/KeyboardArrowDown';
import Extras from './extras';
import IconButton from 'material-ui/IconButton';
import Left from 'material-ui-icons/KeyboardArrowLeft';
import NumberPad from './number-pad';
import Right from 'material-ui-icons/KeyboardArrowRight';
import Up from 'material-ui-icons/KeyboardArrowUp';
import { buttonStyle } from './styles';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import injectSheet from 'react-jss';
import merge from 'lodash/merge';

const bs = buttonStyle();

const topRowStyle = {
  root: merge({}, bs.root, {
    backgroundColor: '#eaeadf',
    marginRight: '0'
  }),
  label: bs.label,
  hideRoot: merge({}, bs.root, {
    opacity: 0.0
  })
};

const Blank = withStyles(
  createStyleSheet('Blank', {
    root: {
      display: 'inline-block',
      backgroundColor: 'white'
    }
  }))(props => <div className={props.classes.root}></div>);

const RawIconButton = (props) => {
  const root = props.hide ? props.classes.hideRoot : props.classes.root;
  return <IconButton
    onClick={props.onClick}
    classes={
      { root, label: props.classes.label }
    }>{props.children}</IconButton >
}


const Tr = withStyles(createStyleSheet('Tr', theme => topRowStyle))(RawIconButton);

const CodeButton = withStyles(createStyleSheet('Code', merge({}, topRowStyle, {
  root: {
    backgroundColor: 'pink'
  }
})))(RawIconButton);

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
      return <Tr
        hide={props.showingCode}
        key={c} onClick={() => props.onClick(c)}><Icon /></Tr>
    })}
    <Blank />
    <Tr
      hide={props.showingCode}
      onClick={() => props.onClick('Backspace')}>    <Backspace />
    </Tr>
    <Tr
      hide={props.showingCode}
    ><Clear onClick={() => props.onClick('clear')} /></Tr>
    <CodeButton onClick={props.onCodeToggle}><Code /></CodeButton>
  </div>
);

export class Keypad extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onNumberPadClick = this.onNumberPadClick.bind(this);
    this.onTopRowClick = this.onTopRowClick.bind(this);
    this.onBasicOperatorsClick = this.onBasicOperatorsClick.bind(this);
    this.onExtrasClick = this.onExtrasClick.bind(this);
    this.toggleCode = this.toggleCode.bind(this);
    this.state = {
      showCode: false
    }
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

  toggleCode() {
    this.setState({ showCode: !this.state.showCode });
  }

  render() {
    console.log('[Keypad] render...');
    const { classes, latex, onChange } = this.props;
    const { showCode } = this.state;

    const holderClasses = classNames(classes.padHolder, showCode && classes.hidden);

    return <div className={classes.root}>
      <TopRow className={classes.topRow}
        onClick={this.onTopRowClick}
        onCodeToggle={this.toggleCode}
        showingCode={showCode} />
      <CodeEditor latex={latex} onChange={onChange} />
      <div className={holderClasses}>
        <NumberPad onClick={this.onNumberPadClick} />
        <BasicOperatorsPad onClick={this.onBasicOperatorsClick} />
        <Extras onClick={this.onExtrasClick} />
      </div>
    </div>;
  }
}

const styles = {
  root: {
    minWidth: '350px',
    display: 'grid',
    gridTemplateRows: '1fr 4fr',
    gridColumnGap: '0px'
  },
  hidden: {
    opacity: 0,
    zIndex: -1
  },
  padHolder: {
    display: 'grid',
    gridColumn: '1/8',
    gridRow: '2/5',
    gridTemplateColumns: '3fr 1fr 4fr',
  },
  topRow: {
    gridColumn: '1/8',
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridRowGap: '0px',
    gridColumnGap: '0px',

  }
}

export default injectSheet(styles)(Keypad);