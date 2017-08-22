import IconButton from 'material-ui/IconButton';
import React from 'react';


export const OverrideIconButton = (props) => (
  <IconButton classes={
    { root: props.classes.root, label: props.classes.label }
  }>{props.children}</IconButton>);


export const buttonStyle = () => ({
  root: {
    borderRadius: '0',
    marginRight: '5px',
    marginBottom: '1px',
    width: '100%',
  },
  label: {
    display: 'block',
  }
});