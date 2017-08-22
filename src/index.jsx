import * as React from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Portal from 'react-portal';

import Keypad from './keypad';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import MathQuillInput from './mathquill-input';

export class MathInput extends React.Component {


  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
    this.onInputClose = this.onInputClose.bind(this);
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
    console.log('onInputClick...', this.state);
    if (this.state.showCalculator === false) {
      this.setState({ showCalculator: true });
    }
  }

  onInputClose() {
    console.log('close...')
    this.setState({ showCalculator: false });
  }

  render() {
    const { classes, latex, onLatexChange } = this.props;
    const { showCalculator } = this.state;

    return <div className={classes.root}>
      <MathQuillInput
        ref={r => this.mq = r}
        latex={latex}
        onChange={onLatexChange}
        onClick={this.onInputClick} />
      <Portal
        closeOnEsc closeOnOutsideClick isOpened={showCalculator}
        onClose={this.onInputClose}>
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Keypad onClick={this.onClick} />
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
      border: 'solid 1px #99999',
      outline: 'none'
    },
    '&  .mq-focused': {
      boxShadow: 'none'
    }
  }
});

export default withStyles(styles)(MathInput);