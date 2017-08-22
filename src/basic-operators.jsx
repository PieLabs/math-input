import { createStyleSheet, withStyles } from 'material-ui/styles'

import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import merge from 'lodash/merge';
import { buttonStyle } from './styles';

const styles = createStyleSheet('BasicOperatorsPad', theme => ({
  root: {
    display: 'grid',
    gridRowGap: '0px',
    gridColumnGap: '0px'
  }
}));

export const defaults = ['/', '*', '-', '+'];

const baseStyles = merge(buttonStyle(), {
  root: {
    backgroundColor: 'orange',
    height: '100%'
  }
});

const BasicOperatorsPadButton = withStyles(createStyleSheet(baseStyles))((props) => {
  return <IconButton
    onClick={() => props.onClick(props.value)}
    classes={props.classes}
  >{props.children}</IconButton>
});


export class BasicOperatorsPad extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log('onClick: ', arguments);
  }

  render() {
    const { classes, values } = this.props;
    return <div className={classes.root}>
      {values.map(v => {

        return <BasicOperatorsPadButton
          key={v}
          onClick={this.onClick}
          value={v}
        >{v}</BasicOperatorsPadButton>
      })}
    </div>
  }
}

BasicOperatorsPad.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string)
}

BasicOperatorsPad.defaultProps = {
  values: defaults
}

const StyledBasicOperatorsPad = withStyles(styles)(BasicOperatorsPad);
export default StyledBasicOperatorsPad;
