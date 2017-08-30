import MathQuill from 'mathquill';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';

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
    const shouldUpdate = nextProps.latex !== this.mathField.latex() || nextProps.readOnly !== this.props.readOnly;
    log('[shouldComponentUpdate]', shouldUpdate);
    return shouldUpdate;
  }

  updateMathField() {
    const { readOnly } = this.props;

    log('[updateMathField] readOnly: ', readOnly);

    this.mathField.latex(this.props.latex);
    this.staticField.latex(this.props.latex);
  }

  componentDidMount() {

    this.staticField = MQ.StaticMath(this.static);

    this.mathField = MQ.MathField(this.input, {
      handlers: {
        edit: this.onInputEdit
      }
    });
    this.updateMathField();
  }

  componentDidUpdate() {
    log('[componentDidUpdate] readOnly: ', this.props.readOnly);
    this.updateMathField();
  }

  render() {
    const { readOnly, classes, onClick } = this.props;
    const inputClassNames = classNames(readOnly && classes.hidden);
    const staticClassNames = classNames(!readOnly && classes.hidden);

    return (
      <div
        ref={r => this.el = r}
        onClick={onClick}>
        <div className={inputClassNames}>
          <span
            ref={r => this.input = r}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          ></span>
        </div>
        <div className={staticClassNames}>
          <span ref={r => this.static = r}></span>
        </div>
      </div>);
  }
}

MathQuillInput.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

MathQuillInput.defaultProps = {
  readOnly: true
}

const styles = {
  hidden: {
    opacity: 0.2,
    display: 'none'
  }
};

export default withStyles(styles, { name: 'MathQuillInput' })(MathQuillInput);
