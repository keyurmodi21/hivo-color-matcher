import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ColorMatcherActionToolbar from './ColorMatcherActionToolbar';
import ColorMatcherList from './ColorMatcherList';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '0 auto'
  }
});

export default function ColorMatcher(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <ColorMatcherActionToolbar {...props} />
      <ColorMatcherList {...props} />
    </Paper>
  );
}
