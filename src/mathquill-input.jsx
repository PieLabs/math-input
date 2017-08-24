import MathQuill from 'mathquill';
import PropTypes from 'prop-types';
import React from 'react';
import debug from 'debug';

const log = debug('math-input:mathquill-input');
const MQ = MathQuill.getInterface(2);

export class MathQuillInput extends React.Component {

  constructor(props) {
    super(props);
    this.onInputEdit = this.onInputEdit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  focus() {
    log('focus mathfield...');
    this.mathField.focus();
  }

  command(v) {
    this.mathField.cmd(v);
    this.mathField.focus();
  }

  keystroke(v) {
    this.mathField.keystroke(v);
    this.mathField.focus();
  }

  write(v) {
    this.mathField.write(v);
    this.mathField.focus();
    this.props.onChange(this.mathField.latex());
  }

  onInputEdit(mf) {
    this.props.onChange(this.mathField.latex());
  }

  componentDidMount() {
    this.updateMathField();
  }

  onFocus(e) {
    log('onFocus..');
    this.props.onFocus(e)
  }

  onBlur(e) {
    log('onBlur..');
    this.props.onBlur(e)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.latex !== this.mathField.latex() || nextProps.readOnly !== this.props.readOnly;
  }

  updateMathField() {
    const { readOnly } = this.props;

    log('readOnly: ', readOnly);

    if (readOnly && (!this.mathField || this.mathField instanceof MQ.MathField)) {
      log('create StaticMath');
      this.mathField = MQ.StaticMath(this.input)
    }

    if (!readOnly && (!this.mathField || this.mathField instanceof MQ.StaticMath)) {
      log('create MathField');
      this.mathField = MQ.MathField(this.input, {
        handlers: {
          edit: this.onInputEdit
        }
      });
    }

    this.mathField.latex(this.props.latex);
  }

  componentDidUpdate() {
    log('[componentDidUpdate] readOnly: ', this.props.readOnly);
    this.updateMathField();
  }

  render() {
    return (
      <div
        ref={r => this.el = r}
        onClick={this.props.onClick}>
        <div
          ref={r => this.input = r}
          onFocus={this.onFocus}
          onBlur={this.onBlur}></div>
      </div>);
  }
}

MathQuillInput.propTypes = {
  readOnly: PropTypes.bool.isRequired
}

MathQuillInput.defaultProps = {
  readOnly: true
}

export default MathQuillInput;
