

import React from 'react';
import MathQuill from 'mathquill';


export class MathQuillInput extends React.Component {

  constructor(props) {
    super(props);
    this.onInputEdit = this.onInputEdit.bind(this);
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
    const MQ = MathQuill.getInterface(2)
    this.mathField = MQ.MathField(this.input, {
      handlers: {
        edit: this.onInputEdit
      }
    });
    this.mathField.latex(this.props.latex);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.latex !== this.mathField.latex();
  }

  componentDidUpdate() {
    console.log('latex: ', this.props.latex);
    this.mathField.latex(this.props.latex);
  }

  render() {

    return <div
      onClick={this.props.onClick}>
      <div ref={r => this.input = r}
        onFocus={() => this.props.onClick}></div>
    </div>;
  }
}

export default MathQuillInput;