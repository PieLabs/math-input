import MathQuill from 'mathquill';
import React from 'react';

export class MathQuillInput extends React.Component {

  constructor(props) {
    super(props);
    this.onInputEdit = this.onInputEdit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  focus() {
    console.log('focus mathfield...');
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
    this.mathField.focus();
  }

  componentDidMount() {
    const MQ = MathQuill.getInterface(2)
    this.mathField = MQ.MathField(this.input, {
      handlers: {
        edit: this.onInputEdit
      }
    });
    this.mathField.latex(this.props.latex);

    // this.mathField.el().addEventListener('onfocus', this.onFocus);
  }

  onFocus(e) {
    console.log('[MathquillInput] onFocus..');
    this.props.onFocus(e)
  }

  onBlur(e) {
    console.log('[MathquillInput] onBlur..');
    this.props.onBlur(e)
  }

  componentWillUnmount() {
    // this.mathField.el().removeEventListener('onfocus', this.onFocus);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.latex !== this.mathField.latex();
  }

  componentDidUpdate() {
    this.mathField.latex(this.props.latex);
  }

  render() {

    return <div
      ref={r => this.el = r}
      onClick={this.props.onClick}>
      <div ref={r => this.input = r}
        onFocus={this.onFocus}
        onBlur={this.onBlur}></div>
    </div>;
  }
}

export default MathQuillInput;