import MathQuill from 'mathquill';
import PropTypes from 'prop-types';
import React from 'react';
import debug from 'debug';
const MQ = MathQuill.getInterface(2);

const log = debug('math-input:editable-math-input');


/**
 * Renders a MathQuill math input.
 * 
 * Only calls onChange once 'editing' has moved from true -> false, 
 * so treats the editing step as it's own little process.
 */
export default class EditableMathInput extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.mathField = MQ.MathField(this.input, {
      handlers: {
        edit: this.onInputEdit.bind(this)
      }
    });
    this.mathField.latex(this.props.latex);
  }
  clear() {
    this.mathField.latex('');
    return '';
  }

  blur() {
    log('blur mathfield');
    this.mathField.blur();
  }

  focus() {
    log('focus mathfield...');
    this.mathField.focus();
  }

  command(v) {
    this.mathField.cmd(v);
    this.mathField.focus();
    return this.mathField.latex();
  }

  keystroke(v) {
    this.mathField.keystroke(v);
    this.mathField.focus();
    return this.mathField.latex();
  }

  write(v) {
    this.mathField.write(v);
    this.mathField.focus();
    return this.mathField.latex();
  }

  onInputEdit(e) {
    log('[onInputEdit] ...');

    if (!this.mathField) {
      return;
    }

    this.props.onChange(this.mathField.latex());
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.latex !== this.mathField.latex();
  }

  render() {
    const { onClick, onFocus, onBlur } = this.props;

    return (
      <span
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={r => this.input = r}></span>
    );
  }
}

EditableMathInput.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  latex: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired
}