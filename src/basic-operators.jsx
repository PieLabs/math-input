import { createStyleSheet, withStyles } from 'material-ui/styles'

import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import { buttonStyle } from './styles';
import merge from 'lodash/merge';

const styles = createStyleSheet('BasicOperatorsPad', theme => ({
  root: {
    display: 'grid',
    gridRowGap: '0px',
    gridColumnGap: '0px'
  }
}));

//symbol: $sce.trustAsHtml('&#247'), logic: 'cmd', command: '\\div', shortcut: '', 
export const defaults = [
  { label: '&divide;', value: '\\div' },
  { label: '*', value: '\\times' },
  '-',
  '+'];

const baseStyles = merge(buttonStyle(), {
  root: {
    backgroundColor: 'orange',
    height: '100%'
  }
});

const BasicOperatorsPadButton = withStyles(createStyleSheet(baseStyles))((props) => {

  const label = props.children.toString();

  return <IconButton
    tabIndex={'-1'}
    onClick={() => props.onClick(props.value)}
    classes={props.classes}>
    <span dangerouslySetInnerHTML={
      { __html: label }
    }></span></IconButton>;
});


export class BasicOperatorsPad extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(value) {
    this.props.onClick(value);
  }

  render() {
    const { classes, values } = this.props;
    return <div className={classes.root}>
      {values.map(v => {

        const label = v.label || v;
        const value = v.value || v;
        return <BasicOperatorsPadButton
          key={label}
          onClick={this.onClick}
          value={value}
        >{label}</BasicOperatorsPadButton>
      })}
    </div>
  }
}

BasicOperatorsPad.propTypes = {
  values: PropTypes.array
}

BasicOperatorsPad.defaultProps = {
  values: defaults
}

const StyledBasicOperatorsPad = withStyles(styles)(BasicOperatorsPad);
export default StyledBasicOperatorsPad;
