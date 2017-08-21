import IconButton from 'material-ui/IconButton';
import React from 'react';
export const button = {
  root: {
    height: '50px',
    width: '50px',
    backgroundColor: '#eeccee',
    border: 'solid 0px black',
    borderRadius: '0',
    marginRight: '1px',
    marginBottom: '1px',
    fontSize: '18px'
  },
  label: {
    width: '40px',
    height: '40px',
    display: 'block'
  }
};


export const OverrideIconButton = (props) => (
  <IconButton classes={
    { root: props.classes.root, label: props.classes.label }
  }>{props.children}</IconButton>);
