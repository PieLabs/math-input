import * as React from 'react';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import Keypad from './keypad';
import MathQuillInput from './mathquill-input';
import Portal from 'react-portal';
import debug from 'debug';

const log = debug('math-input');

export class MathInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showCalculator: false
    }

    this.onKeypadFocus = (e) => {
      log('>> onKeypadFocus', e);
      this.setState({ removePortal: false });
    }

    this.onClick = (data) => {
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

    this.onInputClick = (e) => {
      if (this.props.onInputClick) {
        this.props.onInputClick(e);
      }
    }

    this.onInputFocus = (e) => {
      log('onInputFocus');

      this.setState({ showCalculator: true });
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }

    this.blur = () => {
      log('blur ... ');
      this.setState({ showCalculator: false });
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }

    this.onInputBlur = (e) => {
      this.setState({ removePortal: true });
      setTimeout(() => {
        if (this.state.removePortal) {
          this.blur();
          this.setState({ removePortal: false });
        }
      }, 100);
    }

    this.onCodeEditorBlur = (e) => {
      this.setState({ removePortal: true });
      setTimeout(() => {
        if (this.state.removePortal) {
          this.blur();
        }
      }, 100);
    }

    this.onToggleCode = (codeShowing) => {
      if (!codeShowing) {
        this.mq.focus();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.readOnly) {
      this.setState({ showCalculator: false });
    }
  }

  componentDidUpdate() {

    const { showCalculator } = this.state;
    log('componentDidUpdate, showCalculator: ', showCalculator);

    if (showCalculator) {

      if (this.holder && this.mq) {
        const bounds = this.mq.el.getBoundingClientRect();
        this.holder.style.left = `${bounds.left}px`;
        this.holder.style.top = `${bounds.top + bounds.height}px`;
      }
    }
  }



  render() {
    const { classes, latex, onLatexChange, readOnly } = this.props;
    const { showCalculator } = this.state;

    log('render: readOnly: ', readOnly);

    log('render: ', this.state);
    return <div
      className={classes.root}
      ref={r => this.root = r}>
      <MathQuillInput
        innerRef={r => this.mq = r}
        latex={latex}
        readOnly={readOnly}
        onChange={onLatexChange}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
        onClick={this.onInputClick}
      />
      <Portal
        isOpened={showCalculator && !readOnly}
        onClose={this.onInputClose}>
        <div
          ref={r => this.holder = r}
          className={classes.holder}>
          <Card className={classes.card}>
            <CardContent>
              <Keypad
                onFocus={this.onKeypadFocus}
                onClick={this.onClick}
                latex={latex}
                onChange={onLatexChange}
                onToggleCode={this.onToggleCode}
                onCodeEditorBlur={this.onCodeEditorBlur} />
            </CardContent>
          </Card>
        </div>
      </Portal>
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