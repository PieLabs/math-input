import { createStyleSheet, withStyles } from 'material-ui/styles';

import React from 'react';
import debounce from 'lodash/debounce';

class CodeEditor extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = (e) => {
      this.props.onChange(e.target.value);
    }
  }


  render() {
    const { latex, classes } = this.props;
    return <textarea
      value={latex}
      onChange={this.onChange} className={classes.root}></textarea>;
  }
}

const StyledCodeEditor = withStyles(
  createStyleSheet('CodeEditor', {
    root: {
      gridColumn: '1/8',
      gridRow: '2/5',
      resize: 'none',
      border: 'none',
      backgroundColor: '#cceeff',
      padding: '10px',
      fontSize: '15px',
      '&:focus': {
        outline: 'none',
        backgroundColor: '#ddffff'
      }
    }
  }))(CodeEditor);

export default StyledCodeEditor;