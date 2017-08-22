import MathInput from '../src';
import React from 'react';
import ReactDOM from 'react-dom';


class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latex: '\\frac{3}{2}'
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(latex) {
    this.setState({ latex });
  }

  render() {
    return <div>
      <MathInput latex={this.state.latex} onLatexChange={this.onChange} />
      <pre>{JSON.stringify(this.state.latex, null, '  ')}</pre>
    </div>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const e = React.createElement(Demo, {});
  ReactDOM.render(e, document.querySelector('#app'));
});