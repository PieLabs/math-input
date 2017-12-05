import * as React from 'react';

import Card, { CardActions, CardContent } from 'material-ui/Card';

import EditableMathInput from './editable-math-input';
import Keypad from './keypad';
import MathQuillInput from './mathquill-input';
import Portal from 'react-portal';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';

const log = debug('math-input');

export { MathQuillInput, Keypad, EditableMathInput }

const addLeftBracket = s => s.indexOf('\\(') === 0 ? s : `\\(${s}`;
const addRightBracket = s => s.indexOf('\\)') === s.length - 2 ? s : `${s}\\)`;
const rmLeftBracket = s => s.indexOf('\\(') === 0 ? s.substring(2) : s;
const rmRightBracket = s => s.indexOf('\\)') === s.length - 2 ? s.substring(0, s.length - 2) : s;

export const addBrackets = (s) => addRightBracket(addLeftBracket(s));
export const removeBrackets = (s) => rmRightBracket(rmLeftBracket(s));

export class MathInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showCalculator: false
    }

    this.onKeypadFocus = (e) => {
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
      log('[onInputFocus]');

      this.setState({ showCalculator: true });
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }

    this.blur = (e) => {
      log('[blur] ');
      this.setState({ showCalculator: false });
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }

    this.onInputBlur = (e) => {
      this.setState({ removePortal: true });
      e.persist();
      setTimeout(() => {
        if (this.state.removePortal && this.root !== null) {
          this.setState({ removePortal: false });
          this.blur(e);
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

    this.onLatexChange = (latex) => {
      const { onLatexChange } = this.props;
      if (onLatexChange) {
        onLatexChange(addBrackets(latex));
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
        this.holder.style.top = `${bounds.top + bounds.height + window.scrollY}px`;
      }
    }
  }



  render() {
    const { classes, latex, readOnly, zIndex } = this.props;
    const processedLatex = removeBrackets(latex);
    const { showCalculator } = this.state;

    log('[render] readOnly: ', readOnly, 'processedLatex: ', processedLatex);
    const style = zIndex ? { zIndex } : {};

    return <div
      className={classes.root}
      ref={r => this.root = r}>
      <MathQuillInput
        innerRef={r => this.mq = r}
        latex={processedLatex}
        readOnly={readOnly}
        onChange={this.onLatexChange}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
        onClick={this.onInputClick}
      />
      <Portal
        isOpened={showCalculator && !readOnly}
        onClose={this.onInputClose}>
        <div
          ref={r => this.holder = r}
          className={classes.holder}
          style={style}>
          <Card className={classes.card}>
            <CardContent>
              <Keypad
                onFocus={this.onKeypadFocus}
                onClick={this.onClick}
                latex={processedLatex}
                onChange={this.onLatexChange}
                onToggleCode={this.onToggleCode}
                onCodeEditorBlur={this.onCodeEditorBlur} />
            </CardContent>
          </Card>
        </div>
      </Portal>
    </div>;
  }
}

const styles = {
  root: {
    padding: '2px',
    margin: '2px',
    display: 'inline-block',
    '& .mq-editable-field': {
      border: 'solid 1px #cccccc',
      transition: 'box-shadow 600ms linear, border 500ms linear'
    },
    '& .mq-focused': {
    }
  },
  holder: {
    position: 'absolute',
    display: 'grid',
    minWidth: '380px',
    zIndex: 10
  }
};

export default withStyles(styles, { name: 'MathInput' })(MathInput);