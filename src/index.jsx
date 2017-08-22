import * as React from 'react';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import Keypad from './keypad';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import MathQuillInput from './mathquill-input';

export class MathInput extends React.Component {


  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(data) {
    console.log('[MathInput] onClick: ', data);
    this.mq.write(data.value);
  }

  render() {
    const { classes, latex, onLatexChange } = this.props;

    return <div className={classes.root}>
      <MathQuillInput
        ref={r => this.mq = r}
        latex={latex}
        onChange={onLatexChange} />
      <Card className={classes.card}>
        <CardContent>
          <Keypad
            onClick={this.onClick}
          />
        </CardContent>
      </Card>
    </div>;
  }
}

const styles = createStyleSheet('MathInput', {
  root: {
    padding: '2px',
    margin: '2px',
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