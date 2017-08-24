import * as React from 'react';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import Keypad from './keypad';
import MathQuillInput from './mathquill-input';
import Portal from 'react-portal';

export class MathInput extends React.Component {


  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
    this.onInputClose = this.onInputClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onBeforeInput = this.onBeforeInput.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);

    this.state = {
      showCalculator: false
    }
  }

  onClick(data) {
    console.log('[MathInput] onClick', data);
    const { type, value } = data;
    if (value === 'clear') {
      this.props.onLatexChange('');
    } else if (type === 'command') {
      this.mq.command(data.value);
    } else if (type === 'cursor') {
      this.mq.keystroke(data.value);
    } else {
      this.mq.write(data.value);
    }
  }

  onInputClick() {
    if (this.state.showCalculator === false) {
      this.setState({ showCalculator: true });
    }
  }

  onInputClose() {
    //this.setState({ showCalculator: false });
  }

  componentDidUpdate() {

    console.log('componentDidUpdate, showCalculator: ', this.state.showCalculator);

    if (this.state.showCalculator) {

      if (this.holder && this.mq) {
        const bounds = this.mq.el.getBoundingClientRect();

        this.holder.style.left = `${bounds.left}px`;
        this.holder.style.top = `${bounds.top + bounds.height}px`;
      }
    }
  }

  onKeyDown(e) {
    console.log('[MathInput] onKeyDown, e:', e);
    // e.preventDefault();
    // e.stopPropagation();
  }

  onBeforeInput(e) {
    console.log('[MathInput] onBeforeInput, e:', e);
    // e.preventDefault();
    // e.stopPropagation();
  }

  componentDidMount() {
    console.log('add key down listener...to : ', this.mq.mathField.el());
    this.mq.mathField.el().addEventListener('keydown', this.onKeyDown, true);
    this.mq.mathField.el().addEventListener('beforeinput', this.onBeforeInput, true);
  }
  componentWillUnmount() {
    this.mq.mathField.el().removeEventListener('keydown', this.onKeyDown, true);
    this.mq.mathField.el().removeEventListener('beforeinput', this.onBeforeInput, true);
  }

  onInputFocus(e) {
    console.log('[MathInput] onInputFocus');
    this.setState({ showCalculator: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  onInputBlur(e) {
    console.log('[MathInput] onInputBlur');
    console.log('>> ', e.relatedTarget);
    this.setState({ showCalculator: false });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    // if (this.holder && !this.holder.contains(e.relatedTarget)) {
    // }
  }

  contains(node) {
    if (!this.root) {
      console.warn('no root node');
    }

    return this.root && this.root.contains(node);
  }
  render() {
    const { classes, latex, onLatexChange } = this.props;
    const { showCalculator } = this.state;

    console.log('render: ', this.state);
    return <div
      className={classes.root}
      ref={r => this.root = r}>
      <MathQuillInput
        ref={r => this.mq = r}
        latex={latex}
        onChange={onLatexChange}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
      />
      {/* <Portal
        isOpened={showCalculator}
        onClose={this.onInputClose}>
        <div
          ref={r => this.holder = r}
          className={classes.holder}>
          <Card className={classes.card}>
            <CardContent>
              <Keypad onClick={this.onClick} latex={latex} onChange={onLatexChange} />
            </CardContent>
          </Card>
        </div>
      </Portal> */}
    </div>;
  }
}

const styles = createStyleSheet('MathInput', {
  root: {
    padding: '2px',
    margin: '2px',
    display: 'inline-block',
    '& .mq-editable-field': {
      border: 'solid 1px #cccccc',
      // outline: 'none',
      transition: 'box-shadow 600ms linear, border 500ms linear'
    },
    '& .mq-focused': {
      // boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
      border: 'solid 1px #red',
    }
  },
  holder: {
    position: 'absolute',
    display: 'grid',
    minWidth: '380px'
  }
});

export default withStyles(styles)(MathInput);